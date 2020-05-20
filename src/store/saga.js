import { put, takeEvery } from "redux-saga/effects";
import {
  AUTH_LOGIN,
  SIGN_UP_ACTION,
  POST_MESSAGE_DATA,
  REFRESH_CHAT,
} from "./constants";
import {
  authLoginSuccess,
  signUpSuccess,
  updateSignInResponse,
  signUpError,
  updateUsersList,
  updateConversationsList,
  addMessageToConversations,
  authLoginError,
} from "./actions";
import axios from "axios";

function* getUserList() {
  const getUsersURL = "https://buddy-fc771.firebaseio.com/users.json";
  try {
    const getUsersResponse = yield axios.get(getUsersURL);
    console.log("getUsersResponse", getUsersResponse);
    yield put(updateUsersList(getUsersResponse.data));
  } catch (error) {
    console.log("[Error]", error);
  }
}

function* getConversationList() {
  const getConversationsURL =
    "https://buddy-fc771.firebaseio.com/conversations.json";
  try {
    const getConversationData = yield axios.get(getConversationsURL);
    console.log("getConversationData", getConversationData);
    yield put(updateConversationsList(getConversationData.data));
  } catch (error) {
    console.log("[Error]", error);
  }
}

export function* authLoginSaga(action) {
  const authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  };
  const URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTa0Aedv1Me_JKpMfHRLHT1lGcajhRUWs";

  try {
    const response = yield axios.post(URL, authData);
    if (response.status === 200 && response.data.idToken) {
      yield put(updateSignInResponse(response));
      yield put(authLoginSuccess(authData));
      yield getUserList();
      yield getConversationList();
    }
  } catch (error) {
    console.log("[Error]", error);
    yield put(authLoginError(error.response.data.error));
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
    if (response.status === 200) {
      const data = {
        ...action.payload,
      };
      yield put(signUpSuccess(data));
      try {
        const postURL = "https://buddy-fc771.firebaseio.com/users.json";
        const updateUserResponse = yield axios.post(postURL, data);
        console.log("updateUserResponse", updateUserResponse);
      } catch (error) {
        console.log("[Erro]", error);
      }
    }
  } catch (error) {
    console.log("[Error]", error.response);
    if (error.response && error.response.data) {
      yield put(signUpError(error.response.data.error));
    }
  }
}

export function* postMessageSaga(action) {
  console.log("postMessageSaga", action);
  try {
    const URL = "https://buddy-fc771.firebaseio.com/conversations.json";
    const postMessageResponse = yield axios.post(URL, action.payload);
    if (postMessageResponse.status === 200) {
      console.log("postMessageResponse", postMessageResponse);
      const data = {
        [postMessageResponse.data.name]: {
          ...action.payload,
          messageId: postMessageResponse.data.name,
        },
      };
      yield put(addMessageToConversations(data));
    }
  } catch (error) {
    console.log("[ERROR]", error);
  }
}

export function* refreshChatSaga() {
  yield getConversationList();
}

export function* buddySaga() {
  yield takeEvery(AUTH_LOGIN, authLoginSaga);
  yield takeEvery(SIGN_UP_ACTION, signUpSaga);
  yield takeEvery(POST_MESSAGE_DATA, postMessageSaga);
  yield takeEvery(REFRESH_CHAT, refreshChatSaga);
}
