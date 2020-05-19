import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCESS,
  AUTH_LOGIN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_ACTION,
  SIGN_UP_ERROR,
  UPDATE_SIGN_IN_RESPONSE,
} from "./constants";

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
