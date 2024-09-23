import expressAsyncHandler from "express-async-handler";
import Chat from "../models/ChatModel.js";
import User from "../models/UserModel.js";

export const accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("userId not sent with the request");
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email image",
  });

  if (isChat.length > 0) {
    res.status(200);
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }
  try {
    const createdChat = (await Chat.create(chatData)).populate(
      "users",
      "-password"
    );
    const fullChat = await User.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200);
    res.send(fullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const fetchChat = expressAsyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 })
      .then(async (resp) => {
        await User.populate(resp, {
          path: "latestMessage.sender",
          select: "name image email",
        });
        res.status(200).send(resp);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.users) {
    res.status(400);
    throw new Error("Please fill all the feilds");
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    res.status(400);
    throw new Error("More than 2 users are required to form a group Chat");
  }

  users.push(req.user);
  try {
    const createdGrpChat = await Chat.create({
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
      chatName: req.body.name,
    });
    const fullGrpChat = await Chat.find({ _id: createdGrpChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).send(fullGrpChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const updateGroupName = expressAsyncHandler(async (req, res) => {
  const ID = req.params.id;
  const { chatName } = req.body;
  if (ID) {
    try {
      const updatedGrpChat = await Chat.findByIdAndUpdate(
        ID,
        {
          chatName,
        },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (updatedGrpChat) {
        res.status(200).send(updatedGrpChat);
      } else {
        res.status(400);
        throw new Error("Chat not Found");
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  } else {
    console.log("Id not found in: chatController,updateGroupName ");
  }
});

export const addToGroup = expressAsyncHandler(async (req, res) => {
  const ID = req.params.id;
  const { user } = req.body;
  if (ID) {
    try {
      const added = await Chat.findByIdAndUpdate(
        ID,
        {
          $push: { users: user },
        },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (added) {
        res.status(200).send(added);
      } else {
        res.status(400);
        throw new Error("Chat not Found");
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
export const removeFromGroup = expressAsyncHandler(async (req, res) => {
  const ID = req.params.id;
  const { user } = req.body;
  if (ID) {
    const isAdmin = await Chat.findOne({ _id: ID });
    if (isAdmin.groupAdmin[0].toString() == req.user._id.toString()) {
      try {
        const removed = await Chat.findByIdAndUpdate(
          ID,
          {
            $pull: { users: user },
          },
          { new: true }
        )
          .populate("users", "-password")
          .populate("groupAdmin", "-password");

        if (removed) {
          res.status(200).send(removed);
        } else {
          res.status(400);
          throw new Error("Chat not Found");
        }
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    } else {
      res.status(400);
      throw new Error("Only Admin can remove Users");
    }
  }
});

export const leaveGroup = expressAsyncHandler(async (req, res) => {
  const ID = req.params.id;
  if (ID) {
    try {
      const removed = await Chat.findByIdAndUpdate(
        ID,
        {
          $pull: { users: req.user._id },
        },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (removed) {
        res.status(200).send(removed);
      } else {
        res.status(400);
        throw new Error("Chat not Found");
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
