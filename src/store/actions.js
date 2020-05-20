import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCESS,
  AUTH_LOGIN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ACTION,
  SIGN_UP_ERROR,
  UPDATE_SIGN_IN_RESPONSE,
  UPDATE_USERS_LIST,
  UPDATE_CONVERSATIONS_LIST,
  POST_MESSAGE_DATA,
  ADD_MESSAGE_TO_CONVERSATIONS,
  REFRESH_CHAT,
  LOGOUT,
} from "./constants";

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const authLogin = (payload) => {
  console.log("authLoginAction ", payload);
  return {
    type: AUTH_LOGIN,
    payload,
  };
};

export const authLoginSuccess = (successData) => {
  return {
    type: AUTH_LOGIN_SUCESS,
    successData,
  };
};

export const authLoginError = (error) => {
  return {
    type: AUTH_LOGIN_ERROR,
    error,
  };
};

export const signUpAction = (payload) => {
  console.log("signUpAction", payload);
  return {
    type: SIGN_UP_ACTION,
    payload,
  };
};

export const signUpSuccess = (payload) => {
  console.log("signUpSuccess", payload);
  return {
    type: SIGN_UP_SUCCESS,
    payload,
  };
};

export const signUpError = (error) => {
  return {
    type: SIGN_UP_ERROR,
    error,
  };
};

export const updateSignInResponse = (payload) => {
  return {
    type: UPDATE_SIGN_IN_RESPONSE,
    payload,
  };
};

export const updateUsersList = (payload) => {
  return {
    type: UPDATE_USERS_LIST,
    payload,
  };
};

export const updateConversationsList = (payload) => {
  console.log("updateConversationsList", payload);
  return {
    type: UPDATE_CONVERSATIONS_LIST,
    payload,
  };
};

export const postMessageData = (payload) => {
  return {
    type: POST_MESSAGE_DATA,
    payload,
  };
};

export const addMessageToConversations = (payload) => {
  return {
    type: ADD_MESSAGE_TO_CONVERSATIONS,
    payload,
  };
};

export const refreshChat = () => {
  return {
    type: REFRESH_CHAT,
  };
};
