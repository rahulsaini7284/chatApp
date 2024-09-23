import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import genrateToken from "../config/gernrateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const alreadyExists = await User.findOne({ email });
  if (!alreadyExists.email.includes("guest")) {
    res.status(400);
    throw new Error("User Already Exist");
  } else {
    if (alreadyExists.email.includes("guest")) {
      let newEmail;
      let splited = alreadyExists.email.split("t");
      let isNum = splited[1][0];
      if (typeof isNum === "number") {
        newEmail = splited[0] + "t" + Number(isNum) + 1 + splited[1].slice(1);
        email = newEmail;
      } else {
        email = "guest1@gmail.com";
      }
      name = email.split("@")[0];
    }
    const pass = await bcrypt.hash(password, 10);
    if (pass) {
      const user = await User.create({ name, email, password: pass, image });
      if (user) {
        res.status(201).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          token: genrateToken(user._id),
        });
      }
    }
  }
});

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token: genrateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password");
    }
  } else {
    res.status(400);
    throw new Error("Please enter the Details");
  }
});
export const getAllUsers = asyncHandler(async (req, res) => {
  const keywords = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keywords)
    .find({ _id: { $ne: req.user._id } })
    .select("-password");
  res.send(users);
});
