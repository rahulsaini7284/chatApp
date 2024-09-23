import axios from "axios";
import {
  ADD_USER_TO_GROUP_FAIL,
  ADD_USER_TO_GROUP_REQUEST,
  ADD_USER_TO_GROUP_SUCCESS,
  CREATE_CHAT_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_FAIL,
  CREATE_GROUP_CHAT_REQUEST,
  CREATE_GROUP_CHAT_SUCCESS,
  FETCH_CHAT_FAIL,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  LEAVE_GROUP_CHAT_FAIL,
  LEAVE_GROUP_CHAT_REQUEST,
  LEAVE_GROUP_CHAT_SUCCESS,
  REMOVE_USER_FROM_GROUP_FAIL,
  REMOVE_USER_FROM_GROUP_REQUEST,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  SET_SELECTED_CHAT,
  UPDATE_GROUP_NAME_FAIL,
  UPDATE_GROUP_NAME_REQUEST,
  UPDATE_GROUP_NAME_SUCCESS,
} from "../Constants/chatConstants";

export const createChatAction =
  ({ userId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_CHAT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/chat/", { userId }, config);
      dispatch({ type: SET_SELECTED_CHAT, payload: data });
      if (data) {
        dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: CREATE_CHAT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createGroupChatAction =
  ({ name, users }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_GROUP_CHAT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      users = JSON.stringify(users.map((u) => u._id));

      const { data } = await axios.post(
        "/api/chat/group",
        { name, users },
        config
      );
      dispatch({ type: SET_SELECTED_CHAT, payload: data });
      if (data) {
        dispatch({ type: CREATE_GROUP_CHAT_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: CREATE_GROUP_CHAT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchChatAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_CHAT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/chat/", config);
    if (data) {
      dispatch({ type: FETCH_CHAT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: FETCH_CHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateGroupChatNameAction =
  ({ ID, chatName }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_GROUP_NAME_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/renameGroupName/${ID}`,
        { chatName },
        config
      );
      if (data) {
        dispatch({ type: SET_SELECTED_CHAT, payload: data });
        dispatch({ type: UPDATE_GROUP_NAME_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_GROUP_NAME_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const removeUserFromGroupAction =
  ({ ID, user }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: REMOVE_USER_FROM_GROUP_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/removeFromGroup/${ID}`,
        { user },
        config
      );
      if (data) {
        dispatch({ type: SET_SELECTED_CHAT, payload: data });
        dispatch({ type: REMOVE_USER_FROM_GROUP_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: REMOVE_USER_FROM_GROUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const addUserToGroupAction =
  ({ ID, user }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_USER_TO_GROUP_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/addToGroup/${ID}`,
        { user },
        config
      );
      if (data) {
        dispatch({ type: SET_SELECTED_CHAT, payload: data });
        dispatch({ type: ADD_USER_TO_GROUP_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: ADD_USER_TO_GROUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const leaveGroupAction =
  ({ ID }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: LEAVE_GROUP_CHAT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/leaveGroup/${ID}`,
        {},
        config
      );
      if (data) {
        dispatch({ type: SET_SELECTED_CHAT, payload: data });
        dispatch({ type: LEAVE_GROUP_CHAT_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: LEAVE_GROUP_CHAT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
