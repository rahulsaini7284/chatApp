import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../Redux/Actions/userActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [cPShow, setCPShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState();
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const Toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector((state) => state.userLogin);
  const { error: registerError } = useSelector((state) => state.userRegister);

  const uploadImage = async (file) => {
    try {
      const { data: cloud_name } = await axios("/cloud_name");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "letsChat"); // Optional, use a preset for easier upload

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      return response.data; // Contains the uploaded image information
    } catch (error) {
      setLoad(false);
      console.error("Error uploading image:", error);
    }
  };
  const handleFileChange = (event) => {
    setLoad(true);
    const file = event.target.files[0];
    uploadImage(file)
      .then((result) => {
        Toast({
          title: "Image Upload Successfully!",
          status: "success",
          duration: "1500",
          isClosable: true,
          position: "top",
        });

        setLoad(false);
        console.log("Image uploaded:", result);
        setImage(result.url);
        // Do something with the uploaded image data, e.g., update the UI
      })
      .catch((er) => {
        setLoad(false);
        console.log(er.message);
      });
  };

  const submitHandler = () => {
    if (name && email && password) {
      if (password === confirmPassword) {
        dispatch(registerUserAction({ name, email, password, image }));
      } else {
        Toast({
          title: "Password Do not Match!",
          status: "warning",
          duration: "1500",
          isClosable: true,
          position: "top",
        });
      }
    } else {
      Toast({
        title: "Please fill all the feilds!",
        status: "warning",
        duration: "1500",
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/chat");
    }
    if (registerError === "User Already Exist" && !email && name.length > 1) {
      Toast({
        title: registerError,
        status: "warning",
        duration: "1500",
        isClosable: true,
        position: "top",
      });
    }
  }, [userInfo, navigate, registerError, Toast, email, name]);

  return (
    <VStack>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            id="pass"
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            {show ? (
              <i
                className="fa-solid fa-eye-slash"
                onClick={() => setShow(false)}
              ></i>
            ) : (
              <i className="fa-solid fa-eye" onClick={() => setShow(true)}></i>
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>ConfirmPassword</FormLabel>
        <InputGroup>
          <Input
            id="conPass"
            type={cPShow ? "text" : "password"}
            placeholder="Enter ConfirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement>
            {cPShow ? (
              <i
                className="fa-solid fa-eye-slash"
                onClick={() => setCPShow(false)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye"
                onClick={() => setCPShow(true)}
              ></i>
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Upload Image</FormLabel>
        <Input
          p={1}
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e)}
        />
      </FormControl>
      <Button
        w={"100%"}
        onClick={submitHandler}
        isLoading={loading ? loading : load && load}
        colorScheme={"green"}
        size="md"
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
