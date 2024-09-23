import axios from "axios";
import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_RESET,
  USER_CREATE_SUCCESS,
  USER_IMAGE_UPLOAD_FAIL,
  USER_IMAGE_UPLOAD_REQUEST,
  USER_IMAGE_UPLOAD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USERS_SEARCH_FAIL,
  USERS_SEARCH_REQUEST,
  USERS_SEARCH_SUCCESS,
} from "../Constants/userConstants";

export const registerUserAction =
  ({ name, email, image, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_CREATE_REQUEST });
      const { data } = await axios.post("/api/user/", {
        name,
        email,
        password,
        image,
      });
      if (data) {
        dispatch({
          type: USER_CREATE_SUCCESS,
          payload: data,
        });
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const loginUserAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const userImageUploadAction =
  ({ formData }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_IMAGE_UPLOAD_REQUEST });

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmkp0e3cg/image/upload",
        formData
      );
      try {
        const cloudData = await response.json();
        if (cloudData) {
          console.log(cloudData);
          dispatch({
            type: USER_IMAGE_UPLOAD_SUCCESS,
            payload: cloudData,
          });
        }
      } catch (error) {
        dispatch({
          type: USER_IMAGE_UPLOAD_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_IMAGE_UPLOAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const usersSearchAction =
  ({ search }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USERS_SEARCH_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      console.log(search);
      const { data } = await axios.get(`/api/user?search=${search}`, config);

      dispatch({
        type: USERS_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USERS_SEARCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userLogout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_CREATE_RESET });
  localStorage.removeItem("userInfo");
  document.location.href = "/";
};
