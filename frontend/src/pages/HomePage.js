import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/authantication/Login";
import Signup from "../components/authantication/Signup";
// import { ToastContainer, Bounce } from "react-toastify";

const HomePage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display={"flex"}
        bg={"whitesmoke"}
        p={"3"}
        w={"100%"}
        fontSize={""}
        justifyContent={"center"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        fontFamily={"work sans"}
        borderWidth={"2px"}
      >
        <Text fontSize={"x-large"}>Lets Chat</Text>
      </Box>
      <Box
        bg={"whitesmoke"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"2px"}
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb={"1em"}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
