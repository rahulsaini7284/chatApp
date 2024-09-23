import {
  ADD_NOTIFICATION,
  FETCH_MESSAGES_IN_SINGLE_CHAT_FAIL,
  FETCH_MESSAGES_IN_SINGLE_CHAT_REQUEST,
  FETCH_MESSAGES_IN_SINGLE_CHAT_SUCCESS,
  SEND_MESSAGE_FAIL_IN_SINGLE_CHAT,
  SEND_MESSAGE_REQUEST_IN_SINGLE_CHAT,
  SEND_MESSAGE_RESET_IN_SINGLE_CHAT,
  SEND_MESSAGE_SUCCESS_IN_SINGLE_CHAT,
  UPDATE_NOTIFICATION,
} from "../Constants/messageConstants";

export const sendMessageInSingleChatReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST_IN_SINGLE_CHAT:
      return { loading: true };
    case SEND_MESSAGE_SUCCESS_IN_SINGLE_CHAT:
      return { loading: false, messages: action.payload };
    case SEND_MESSAGE_FAIL_IN_SINGLE_CHAT:
      return { loading: false, error: action.payload };
    case SEND_MESSAGE_RESET_IN_SINGLE_CHAT:
      return { loading: false, messages: undefined };
    default:
      return state;
  }
};
export const fetchMessageInSingleChatReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_IN_SINGLE_CHAT_REQUEST:
      return { loading: true };
    case FETCH_MESSAGES_IN_SINGLE_CHAT_SUCCESS:
      return { loading: false, fetchMessages: action.payload };
    case FETCH_MESSAGES_IN_SINGLE_CHAT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const notificationReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return { notifications: action.payload };
    case UPDATE_NOTIFICATION:
      return { notifications: action.payload };
    default:
      return state;
  }
};
