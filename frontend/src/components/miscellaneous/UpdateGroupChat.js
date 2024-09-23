import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  IconButton,
  Box,
  FormControl,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserBadgeItem from "./UserBadgeItem";
import {
  addUserToGroupAction,
  fetchChatAction,
  leaveGroupAction,
  removeUserFromGroupAction,
  updateGroupChatNameAction,
} from "../../Redux/Actions/chatActions";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import {
  ADD_USER_TO_GROUP_RESET,
  LEAVE_GROUP_CHAT_RESET,
  REMOVE_USER_FROM_GROUP_RESET,
  UPDATE_GROUP_NAME_RESET,
} from "../../Redux/Constants/chatConstants";
import { usersSearchAction } from "../../Redux/Actions/userActions";
import UsersListItem from "../userAvatar/UsersListItem";

const UpdateGroupChat = () => {
  const Toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const { selectedChat } = useSelector((state) => state.selectedChat);
  const { success, error } = useSelector((state) => state.removedFromGroupChat);
  const { success: addUserSuccess, error: addUserError } = useSelector(
    (state) => state.addedToGroupChat
  );
  const { success: leaveSuccess, error: leaveError } = useSelector(
    (state) => state.leaveGroupChat
  );
  const {
    updatedGroupChat,
    loading: updateGrpNameLoading,
    error: updateGrpNameErr,
  } = useSelector((state) => state.updatedGroupChatName);
  const { users, loading } = useSelector((state) => state.usersSearch);
  const removeUser = (user) => {
    dispatch(
      removeUserFromGroupAction({ ID: selectedChat._id, user: user._id })
    );
  };
  const handleRename = () => {
    if (!groupChatName) {
      Toast({
        title: "Please Enter Group Name",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    dispatch(
      updateGroupChatNameAction({
        ID: selectedChat._id,
        chatName: groupChatName,
      })
    );
  };

  const handleSearch = (value) => {
    dispatch(usersSearchAction({ search: value }));
  };
  const handleLeave = () => {
    dispatch(leaveGroupAction({ ID: selectedChat._id }));
  };
  const handleAdd = (user) => {
    dispatch(addUserToGroupAction({ ID: selectedChat._id, user: user._id }));
  };

  useEffect(() => {
    if (leaveSuccess) {
      dispatch({ type: LEAVE_GROUP_CHAT_RESET });
      dispatch(fetchChatAction());
      onClose();
      toast.success("Group removed successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    } else if (leaveError) {
      dispatch({ type: LEAVE_GROUP_CHAT_RESET });
      toast.error(leaveError, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (addUserSuccess) {
      dispatch({ type: ADD_USER_TO_GROUP_RESET });
      dispatch(fetchChatAction());
      toast.success("User Added Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    } else if (addUserError) {
      dispatch({ type: ADD_USER_TO_GROUP_RESET });
      toast.error(addUserError, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (success) {
      dispatch({ type: REMOVE_USER_FROM_GROUP_RESET });
      dispatch(fetchChatAction());
      toast.success("User Removed Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    } else if (error) {
      dispatch({ type: REMOVE_USER_FROM_GROUP_RESET });
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (updatedGroupChat?._id) {
      dispatch({ type: UPDATE_GROUP_NAME_RESET });
      dispatch(fetchChatAction());
      onClose();
      toast.success("Group Name Updated", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    } else if (updateGrpNameErr) {
      toast.success(updateGrpNameErr, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
  }, [
    dispatch,
    updateGrpNameErr,
    updatedGroupChat,
    onClose,
    success,
    error,
    addUserError,
    addUserSuccess,
    leaveError,
    leaveSuccess,
  ]);

  return (
    <>
      <IconButton display="flex" onClick={onOpen} icon={<ViewIcon />} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" pb={3} flexWrap="wrap" w="100%">
              {selectedChat?.users.map((user) => (
                <UserBadgeItem
                  user={user}
                  admin={selectedChat.groupAdmin[0]._id}
                  handleFunction={() => removeUser(user)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={updateGrpNameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to The Group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner m="auto" color="red.500" />
            ) : (
              users &&
              users
                .slice(0, 4)
                .map((user) => (
                  <UsersListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAdd(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={handleLeave}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChat;
