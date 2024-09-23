import axios from "axios";
import {
  FETCH_MESSAGES_IN_SINGLE_CHAT_FAIL,
  FETCH_MESSAGES_IN_SINGLE_CHAT_REQUEST,
  FETCH_MESSAGES_IN_SINGLE_CHAT_SUCCESS,
  SEND_MESSAGE_FAIL_IN_SINGLE_CHAT,
  SEND_MESSAGE_REQUEST_IN_SINGLE_CHAT,
  SEND_MESSAGE_SUCCESS_IN_SINGLE_CHAT,
} from "../Constants/messageConstants";

export const sendMessageInSingleChatAction =
  ({ content, chatId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SEND_MESSAGE_REQUEST_IN_SINGLE_CHAT });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/message`,
        { content, chatId },
        config
      );
      if (data) {
        dispatch({ type: SEND_MESSAGE_SUCCESS_IN_SINGLE_CHAT, payload: data });
      }
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAIL_IN_SINGLE_CHAT,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchMessagesSingleChat =
  ({ chatId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_MESSAGES_IN_SINGLE_CHAT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/message/${chatId}`, config);
      if (data) {
        dispatch({
          type: FETCH_MESSAGES_IN_SINGLE_CHAT_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_MESSAGES_IN_SINGLE_CHAT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
