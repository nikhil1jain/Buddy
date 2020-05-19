import { put, takeEvery } from "redux-saga/effects";
import { AUTH_LOGIN, SIGN_UP_ACTION } from "./constants";
import {
  authLoginSuccess,
  signUpSuccess,
  updateSignInResponse,
  signUpError,
} from "./actions";
import axios from "axios";

export function* authLoginSaga(action) {
  const authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  };
  const URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTa0Aedv1Me_JKpMfHRLHT1lGcajhRUWs";
  let responseData = null;

  try {
    const response = yield axios.post(URL, authData);
    if (response.status === 200 && response.data.idToken) {
      yield put(updateSignInResponse(response));
      yield put(authLoginSuccess(response));
    }
  } catch (error) {
    console.log("[Error]", error);
  }
}

export function* signUpSaga(action) {
  const signUpAuthData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  };
  console.log("signUPAUthData", signUpAuthData);
  const URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTa0Aedv1Me_JKpMfHRLHT1lGcajhRUWs";
  try {
    const response = yield axios.post(URL, signUpAuthData);
    console.log("SignUp response", response);
    const data = {
      ...action.payload,
    };
    yield put(signUpSuccess(data));
  } catch (error) {
    console.log("[Error]", error.response);
    if (error.response && error.response.data) {
      yield put(signUpError(error.response.data.error));
    }
  }
}

export function* buddySaga() {
  yield takeEvery(AUTH_LOGIN, authLoginSaga);
  yield takeEvery(SIGN_UP_ACTION, signUpSaga);
}
