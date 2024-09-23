import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfilePage = ({ user, Children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {Children ? (
        <span onClick={onOpen}>{Children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal
        size={{ base: "sm", md: "lg" }}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent h={{ md: "410px", base: "350px" }}>
          <ModalHeader
            display="flex"
            fontSize={{ base: "22px", md: "40px" }}
            fontFamily="Work sans"
            justifyContent="center"
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize={{ base: "100px", md: "150px" }}
              src={user?.image}
              alt={user?.name}
            />
            <Text
              fontSize={{ base: "20px", md: "28px" }}
              fontFamily="Work sans"
            >
              Email: {user?.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfilePage;
