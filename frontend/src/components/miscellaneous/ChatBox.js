import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import SingleChat from "../SingleChat";

const ChatBox = () => {
  const { selectedChat } = useSelector((state) => state.selectedChat);
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "60%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      chats...
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
