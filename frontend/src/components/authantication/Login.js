import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUserAction,
  registerUserAction,
} from "../../Redux/Actions/userActions";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [appId, setAppId] = useState();
  const [password, setPassword] = useState();
  const [googleData, setGoogleData] = useState({ email: "", password: "" });
  const [facebookData, setFacebookData] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, userInfo } = useSelector((state) => state.userLogin);
  const { error: registerErr } = useSelector((state) => state.userRegister);

  const submitHandler = () => {
    if (email && password) {
      dispatch(loginUserAction({ email, password }));
    } else {
      toast({
        title: "Please fill all feilds!",
        status: "warning",
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    async function getAppId() {
      const { data } = await axios("/app_id");
      setAppId(data);
    }
    getAppId().catch((err) => console.log(err.message));
    if (error) {
      console.log(error);
      toast({
        title: error && error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    if (userInfo) {
      toast({
        title: "Login Successfully!",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      navigate("/chat");
    }
  }, [error, userInfo, toast, navigate]);

  useEffect(() => {
    if (
      registerErr === "User Already Exist" &&
      googleData.email &&
      googleData.password
    ) {
      dispatch(
        loginUserAction({
          email: googleData.email,
          password: googleData.password,
        })
      );
    }

    setFacebookData({ email: "", password: "" });
  }, [registerErr, dispatch, googleData]);

  useEffect(() => {
    if (
      registerErr === "User Already Exist" &&
      facebookData.email &&
      facebookData.password
    ) {
      dispatch(
        loginUserAction({
          email: facebookData.email,
          password: facebookData.password,
        })
      );
      setGoogleData({ email: "", password: "" });
    }
  }, [registerErr, dispatch, facebookData]);

  const registerAsAGuest = () => {
    dispatch(registerUserAction({ email, password }));
  };

  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          id="emil"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            id="password"
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
      <Button
        w={"100%"}
        isLoading={loading}
        onClick={submitHandler}
        colorScheme={"green"}
        size="md"
      >
        Login
      </Button>
      <Button
        w={"100%"}
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("guest111");
          registerAsAGuest();
        }}
        colorScheme={"red"}
        variant="solid"
        size="md"
      >
        Get Guest User Credentials
      </Button>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          var decodedRes = jwtDecode(credentialResponse.credential);
          setGoogleData({
            email: decodedRes.email,
            password: `@{[($${decodedRes.name}`,
          });
          dispatch(
            registerUserAction({
              email: decodedRes.email,
              name: decodedRes.name,
              password: `@{[($${decodedRes.name}`,
            })
          );
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      {appId && (
        <LoginSocialFacebook
          appId={appId}
          onResolve={(res) => {
            setFacebookData({
              email: res.data.email,
              password: `${res.data.id}+${res.data.first_name}+${res.data.email}`,
            });
            dispatch(
              registerUserAction({
                email: res.data.email,
                password: `${res.data.id}+${res.data.first_name}+${res.data.email}`,
                name: res.data.name,
              })
            );
          }}
          onReject={(err) => console.log(err)}
        >
          <FacebookLoginButton
            style={{
              width: "210.5px",
              marginLeft: "0",
              fontSize: "1rem",
            }}
          />
        </LoginSocialFacebook>
      )}
    </VStack>
  );
};

export default Login;
