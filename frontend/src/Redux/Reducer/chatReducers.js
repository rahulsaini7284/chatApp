import {
  ADD_USER_TO_GROUP_FAIL,
  ADD_USER_TO_GROUP_REQUEST,
  ADD_USER_TO_GROUP_RESET,
  ADD_USER_TO_GROUP_SUCCESS,
  CREATE_CHAT_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_RESET,
  CREATE_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_FAIL,
  CREATE_GROUP_CHAT_REQUEST,
  CREATE_GROUP_CHAT_RESET,
  CREATE_GROUP_CHAT_SUCCESS,
  FETCH_CHAT_FAIL,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_RESET,
  FETCH_CHAT_SUCCESS,
  LEAVE_GROUP_CHAT_FAIL,
  LEAVE_GROUP_CHAT_REQUEST,
  LEAVE_GROUP_CHAT_RESET,
  LEAVE_GROUP_CHAT_SUCCESS,
  REMOVE_USER_FROM_GROUP_FAIL,
  REMOVE_USER_FROM_GROUP_REQUEST,
  REMOVE_USER_FROM_GROUP_RESET,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  SET_SELECTED_CHAT,
  UPDATE_GROUP_NAME_FAIL,
  UPDATE_GROUP_NAME_REQUEST,
  UPDATE_GROUP_NAME_RESET,
  UPDATE_GROUP_NAME_SUCCESS,
} from "../Constants/chatConstants";

export const createChatReducer = (state = { createdChat: {} }, action) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
      return { loading: true };
    case CREATE_CHAT_SUCCESS:
      return { loading: false, createdChat: action.payload };
    case CREATE_CHAT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_CHAT_RESET:
      return state;
    default:
      return state;
  }
};
export const createdGroupChatReducer = (
  state = { createdGroupChat: {}, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_GROUP_CHAT_REQUEST:
      return { loading: true };
    case CREATE_GROUP_CHAT_SUCCESS:
      return {
        loading: false,
        createdGroupChat: action.payload,
        success: true,
      };
    case CREATE_GROUP_CHAT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_GROUP_CHAT_RESET:
      return state;
    default:
      return state;
  }
};
export const fetchChatReducer = (state = { chat: [] }, action) => {
  switch (action.type) {
    case FETCH_CHAT_REQUEST:
      return { loading: true };
    case FETCH_CHAT_SUCCESS:
      return { loading: false, chat: action.payload };
    case FETCH_CHAT_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_CHAT_RESET:
      return state;
    default:
      return state;
  }
};
export const updateGroupChatNameReducer = (
  state = { updatedGroupChat: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_GROUP_NAME_REQUEST:
      return { loading: true };
    case UPDATE_GROUP_NAME_SUCCESS:
      return { loading: false, updatedGroupChat: action.payload };
    case UPDATE_GROUP_NAME_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_GROUP_NAME_RESET:
      return { updatedGroupChat: "" };
    default:
      return state;
  }
};
export const removeUserFromGroupReducer = (
  state = { removedUserChat: {}, success: false },
  action
) => {
  switch (action.type) {
    case REMOVE_USER_FROM_GROUP_REQUEST:
      return { loading: true };
    case REMOVE_USER_FROM_GROUP_SUCCESS:
      return { loading: false, removedUserChat: action.payload, success: true };
    case REMOVE_USER_FROM_GROUP_FAIL:
      return { loading: false, error: action.payload };
    case REMOVE_USER_FROM_GROUP_RESET:
      return { removedUserChat: "", success: false };
    default:
      return state;
  }
};
export const addUserToGroupReducer = (
  state = { addedUserChat: {}, success: false },
  action
) => {
  switch (action.type) {
    case ADD_USER_TO_GROUP_REQUEST:
      return { loading: true };
    case ADD_USER_TO_GROUP_SUCCESS:
      return { loading: false, addedUserChat: action.payload, success: true };
    case ADD_USER_TO_GROUP_FAIL:
      return { loading: false, error: action.payload };
    case ADD_USER_TO_GROUP_RESET:
      return { addedUserChat: "", success: false };
    default:
      return state;
  }
};
export const leaveGroupReducer = (
  state = { leaveGroupChat: {}, success: false },
  action
) => {
  switch (action.type) {
    case LEAVE_GROUP_CHAT_REQUEST:
      return { loading: true };
    case LEAVE_GROUP_CHAT_SUCCESS:
      return { loading: false, leaveGroupChat: action.payload, success: true };
    case LEAVE_GROUP_CHAT_FAIL:
      return { loading: false, error: action.payload };
    case LEAVE_GROUP_CHAT_RESET:
      return { leaveGroupChat: "", success: false };
    default:
      return state;
  }
};
export const setSeletedChatReducer = (state = { selectedChat: {} }, action) => {
  switch (action.type) {
    case SET_SELECTED_CHAT:
      return { selectedChat: action.payload };
    default:
      return state;
  }
};
