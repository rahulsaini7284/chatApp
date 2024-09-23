import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_RESET,
  USER_CREATE_SUCCESS,
  USER_IMAGE_UPLOAD_FAIL,
  USER_IMAGE_UPLOAD_REQUEST,
  USER_IMAGE_UPLOAD_RESET,
  USER_IMAGE_UPLOAD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USERS_SEARCH_FAIL,
  USERS_SEARCH_REQUEST,
  USERS_SEARCH_RESET,
  USERS_SEARCH_SUCCESS,
} from "../Constants/userConstants";

export const userRegisterReducer = (
  state = { userInfo: {}, error: "" },
  action
) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_RESET:
      return state;
    default:
      return state;
  }
};
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_RESET:
      return state;
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userImageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_IMAGE_UPLOAD_REQUEST:
      return { loading: true };
    case USER_IMAGE_UPLOAD_SUCCESS:
      return { loading: false, image: action.payload };
    case USER_IMAGE_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    case USER_IMAGE_UPLOAD_RESET:
      return state;
    default:
      return state;
  }
};
export const usersSearchReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_SEARCH_REQUEST:
      return { loading: true };
    case USERS_SEARCH_SUCCESS:
      return { loading: false, users: action.payload };
    case USERS_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    case USERS_SEARCH_RESET:
      return { users: [] };
    default:
      return state;
  }
};
