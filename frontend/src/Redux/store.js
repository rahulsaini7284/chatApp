import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  userImageUploadReducer,
  userLoginReducer,
  userRegisterReducer,
  usersSearchReducer,
} from "./Reducer/userReducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  createChatReducer,
  fetchChatReducer,
  setSeletedChatReducer,
  createdGroupChatReducer,
  updateGroupChatNameReducer,
  removeUserFromGroupReducer,
  addUserToGroupReducer,
  leaveGroupReducer,
} from "./Reducer/chatReducers";
import {
  fetchMessageInSingleChatReducer,
  notificationReducer,
  sendMessageInSingleChatReducer,
} from "./Reducer/messageReducer";

const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userImage: userImageUploadReducer,
  usersSearch: usersSearchReducer,
  createdChat: createChatReducer,
  fetchChat: fetchChatReducer,
  selectedChat: setSeletedChatReducer,
  createdGroupChat: createdGroupChatReducer,
  updatedGroupChatName: updateGroupChatNameReducer,
  removedFromGroupChat: removeUserFromGroupReducer,
  addedToGroupChat: addUserToGroupReducer,
  leaveGroupChat: leaveGroupReducer,
  sendMessageSingleChat: sendMessageInSingleChatReducer,
  fetchMessageInSingleChat: fetchMessageInSingleChatReducer,
  notifications: notificationReducer,
});
const middleware = [thunk];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const InitialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

export const store = createStore(
  reducers,
  InitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
