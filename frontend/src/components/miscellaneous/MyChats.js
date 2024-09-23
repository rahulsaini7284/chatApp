import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatAction } from "../../Redux/Actions/chatActions";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "../ChatLoading";
import { SET_SELECTED_CHAT } from "../../Redux/Constants/chatConstants";
import { getSender } from "../config/ChatLogics";
import GroupChatModel from "./GroupChatModel";

const MyChats = () => {
  const { chat } = useSelector((state) => state.fetchChat);
  const { selectedChat } = useSelector((state) => state.selectedChat);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatAction());
  }, [dispatch]);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "38%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModel
          child={
            <Button
              display="flex"
              fontSize={{ base: "13px", md: "15px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              New Group Chat
            </Button>
          }
        />
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#f8f8f8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chat ? (
          <Stack overflowY="scroll">
            {chat?.map((c) => (
              <Box
                key={c._id}
                onClick={() =>
                  dispatch({ type: SET_SELECTED_CHAT, payload: c })
                }
                cursor="pointer"
                bg={selectedChat === c ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === c ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
              >
                <Text>
                  {!c.isGroupChat ? getSender(userInfo, c.users) : c.chatName}
                </Text>
                {c.latestMessage && (
                  <Text fontSize="xs">
                    <b>{c.latestMessage.sender.name} : </b>
                    {c.latestMessage.content.length > 50
                      ? c.latestMessage.content.substring(0, 51) + "..."
                      : c.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
