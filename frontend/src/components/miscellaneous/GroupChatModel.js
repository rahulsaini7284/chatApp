import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSearchAction } from "../../Redux/Actions/userActions";
import UsersListItem from "../userAvatar/UsersListItem";
import UserBadgeItem from "./UserBadgeItem";
import {
  createGroupChatAction,
  fetchChatAction,
} from "../../Redux/Actions/chatActions";

import { CREATE_GROUP_CHAT_RESET } from "../../Redux/Constants/chatConstants";
import { USERS_SEARCH_RESET } from "../../Redux/Constants/userConstants";

const GroupChatModel = ({ child }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  // const { chat } = useSelector((state) => state.fetchChat);
  // const { selectedChat } = useSelector((state) => state.selectedChat);
  // const { userInfo } = useSelector((state) => state.userLogin);
  const { users, loading } = useSelector((state) => state.usersSearch);
  const { error: grpChatErr, success } = useSelector(
    (state) => state.createdGroupChat
  );
  const dispatch = useDispatch();
  const Tost = useToast();

  const handleSearch = (value) => {
    if (!value) {
      return;
    }
    dispatch(usersSearchAction({ search: value }));
  };
  const handleGroup = (user) => {
    if (selectedUsers.includes(user)) {
      Tost({
        title: "User Already Added",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };
  const removeUser = (user) => {
    const newUsers = selectedUsers.filter((u) => u._id !== user._id);
    setSelectedUsers(newUsers);
  };
  const handleSubmit = () => {
    if (!selectedUsers || !groupChatName) {
      Tost({
        title: "Please fill all the Feilds",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    } else {
      dispatch(
        createGroupChatAction({ name: groupChatName, users: selectedUsers })
      );
    }
  };

  useEffect(() => {
    if (grpChatErr) {
      toast.error(grpChatErr, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    } else if (success && !grpChatErr) {
      dispatch(fetchChatAction());
      Tost({
        title: "Group Chat Created",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });

      setSelectedUsers([]);
      dispatch({ type: USERS_SEARCH_RESET });
      onClose();
      dispatch({ type: CREATE_GROUP_CHAT_RESET });
    }
  }, [grpChatErr, Tost, success, dispatch, onClose]);
  return (
    <>
      <span onClick={onOpen}>{child}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            justifyContent="center"
            fontFamily="Work sans"
            fontSize="35px"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" justifyContent="center">
            <FormControl>
              <Input
                mb={3}
                placeholder="Chat Name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                mb={3}
                placeholder="Search Users eg: Ram,John"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </FormControl>

            <Box display="flex" width="100%" flexWrap="wrap">
              {selectedUsers.length > 0 &&
                selectedUsers.map((user) => (
                  <UserBadgeItem
                    user={user}
                    handleFunction={() => removeUser(user)}
                  />
                ))}
            </Box>

            {loading ? (
              <Spinner m="auto" color="red.500" />
            ) : (
              users &&
              users
                ?.slice(0, 4)
                .map((user) => (
                  <UsersListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModel;
