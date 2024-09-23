import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_CHAT } from "../Redux/Constants/chatConstants";
import { getSender, getSenderFull } from "./config/ChatLogics";
import ProfilePage from "./miscellaneous/ProfilePage";
import UpdateGroupChat from "./miscellaneous/UpdateGroupChat";
import io from "socket.io-client";
import {
  fetchMessagesSingleChat,
  sendMessageInSingleChatAction,
} from "../Redux/Actions/messageActions";
import "./style.css";
import ScrolableChat from "./ScrolableChat";
import animationData from "../animations/typing.json";
import { ADD_NOTIFICATION } from "../Redux/Constants/messageConstants";
import { fetchChatAction } from "../Redux/Actions/chatActions";

const ENDPOINT = "http://localhost:7284";
var socket, selectedChatCompare;

const SingleChat = () => {
  const { selectedChat } = useSelector((state) => state.selectedChat);
  const { notifications } = useSelector((state) => state.notifications);
  const { loading, fetchMessages } = useSelector(
    (state) => state.fetchMessageInSingleChat
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const [newMessage, SetNewMessage] = useState("");
  const [fMessages, SetFMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { messages } = useSelector((state) => state.sendMessageSingleChat);
  const dispatch = useDispatch();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (selectedChat) {
      console.log("it called");
      selectedChatCompare = selectedChat;
      dispatch(fetchMessagesSingleChat({ chatId: selectedChat._id }));
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    if (messages) {
      socket.emit("new message", messages);
      SetFMessages([...fMessages, messages]);
    }
  }, [messages]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const sendMessage = (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      SetNewMessage("");
      dispatch(
        sendMessageInSingleChatAction({
          content: newMessage,
          chatId: selectedChat._id,
        })
      );
    }
  };

  const typingHandler = (e) => {
    SetNewMessage(e.target.value);
    // typing indicator logic

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3200;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if ((fetchMessages, selectedChat)) {
      SetFMessages(fetchMessages);
      socket.emit("join chat", selectedChat._id);
    }
  }, [fetchMessages, selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      // console.log(selectedChatCompare, newMessageRecieved);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        console.log("outer");
        if (!notifications.includes(newMessageRecieved)) {
          console.log("inner");
          dispatch({
            type: ADD_NOTIFICATION,
            payload: [newMessageRecieved, ...notifications],
          });
          dispatch(fetchChatAction());
        }
      } else {
        fMessages && SetFMessages([...fMessages, newMessageRecieved]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => dispatch({ type: SET_SELECTED_CHAT, payload: "" })}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(userInfo, selectedChat.users)}
                <ProfilePage
                  user={getSenderFull(userInfo, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChat />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                margin="auto"
                alignSelf="center"
                size="xl"
              />
            ) : (
              <div className="messages">
                <ScrolableChat messages={fMessages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a Message.."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a User to start Chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
