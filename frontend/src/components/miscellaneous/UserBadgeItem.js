import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction, admin = "" }) => {
  const nothing = () => {
    console.log(user, admin);
  };
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      backgroundColor={admin === user._id ? "orangered" : "purple"}
      color="white"
      cursor="pointer"
      onClick={admin !== user._id ? handleFunction : nothing}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
