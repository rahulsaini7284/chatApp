import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

const ChatPage = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div style={{ width: "100%" }}>
      {userInfo && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-around"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {userInfo && <MyChats />}
        {userInfo && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
