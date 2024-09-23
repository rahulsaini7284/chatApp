import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfilePage from "./ProfilePage";
import { userLogout, usersSearchAction } from "../../Redux/Actions/userActions";
import ChatLoading from "../ChatLoading";
import UsersListItem from "../userAvatar/UsersListItem";
import { createChatAction } from "../../Redux/Actions/chatActions";
import { USERS_SEARCH_RESET } from "../../Redux/Constants/userConstants";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { UPDATE_NOTIFICATION } from "../../Redux/Constants/messageConstants";
import { SET_SELECTED_CHAT } from "../../Redux/Constants/chatConstants";
import { getSender } from "../config/ChatLogics";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const Toast = useToast();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { notifications } = useSelector((state) => state.notifications);
  const { loading: createChatLoading } = useSelector(
    (state) => state.createdChat
  );
  const { selectedChat } = useSelector((state) => state.selectedChat);
  const { users, loading, error } = useSelector((state) => state.usersSearch);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };
  const HandleSearch = () => {
    if (!search) {
      Toast({
        title: "Please Enter what you want to search!",
        status: "warning",
        duration: "1000",
        isClosable: true,
        position: "top-left",
      });
    } else {
      console.log({ search });
      dispatch(usersSearchAction({ search }));
    }
  };

  const accessChat = (userId) => {
    dispatch(createChatAction({ userId }));
  };

  useEffect(() => {
    if (selectedChat) {
      onClose();
    }
    if (error) {
      Toast({
        title: error,
        status: "danger",
        duration: "1000",
        isClosable: true,
        position: "center",
      });
      dispatch({ type: USERS_SEARCH_RESET });
    }

    return () => {};
  }, [error, Toast, dispatch, selectedChat, onClose]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="whitesmoke"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search "></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="work sans">
          Lets-Chat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notifications.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notifications.length && "No New Messages"}
              {notifications.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    dispatch({ type: SET_SELECTED_CHAT, payload: notif.chat });
                    dispatch({
                      type: UPDATE_NOTIFICATION,
                      payload: notifications.filter((n) => n !== notif),
                    });
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(
                        userInfo,
                        notif.chat.users
                      )}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={userInfo.name}
                src={userInfo.image}
              />
            </MenuButton>
            <MenuList>
              <ProfilePage
                user={userInfo}
                Children={
                  <MenuItem>
                    <i
                      style={{ paddingRight: "4px" }}
                      className="fa-solid fa-user"
                    ></i>
                    Profile
                  </MenuItem>
                }
              />
              <MenuDivider />
              <MenuItem onClick={handleLogout}>
                <i
                  style={{ paddingRight: "4px" }}
                  className="fa-solid fa-right-from-bracket"
                ></i>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search By Name or Email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={HandleSearch}>
                <i className="fas fa-search"></i>
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              users?.map((user) => (
                <UsersListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {createChatLoading && <Spinner m="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
