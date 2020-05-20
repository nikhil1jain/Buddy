import {
  SIGN_UP_SUCCESS,
  UPDATE_SIGN_IN_RESPONSE,
  SIGN_UP_ERROR,
  AUTH_LOGIN_SUCESS,
  AUTH_LOGIN_ERROR,
  UPDATE_USERS_LIST,
  UPDATE_CONVERSATIONS_LIST,
  ADD_MESSAGE_TO_CONVERSATIONS,
  LOGOUT,
} from "./constants";

const initialState = {
  conversations: {},
  userList: {},
  token: null,
  userId: null,
  signUpError: null,
  isLoggedIn: false,
  loggedInUser: null,
  isSignUpSuccess: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      const user = { [action.payload.email]: { ...action.payload } };
      const userObj = updateObject(state.loggedInUser, user);
      const userList = {
        user: userObj,
        isSignUpSuccess: true,
      };
      return updateObject(state, userList);
    case UPDATE_SIGN_IN_RESPONSE:
      return updateObject(state, {
        token: action.payload.data.idToken,
        userId: action.payload.data.localId,
      });
    case SIGN_UP_ERROR:
      console.log("action", action);
      return updateObject(state, { signUpError: action.error.message });
    case AUTH_LOGIN_ERROR:
      return updateObject(state, { signInError: action.error.message });
    case AUTH_LOGIN_SUCESS:
      return updateObject(state, {
        isLoggedIn: true,
        loggedInUser: {
          email: action.successData.email,
        },
      });
    case UPDATE_USERS_LIST:
      const userArr = updateUsersList(action.payload);
      return updateObject(state, { userList: userArr });
    case UPDATE_CONVERSATIONS_LIST:
      return updateObject(state, { conversations: action.payload });
    case ADD_MESSAGE_TO_CONVERSATIONS:
      const newObj = updateObject(state.conversations, action.payload);
      return updateObject(state, { conversations: { ...newObj } });
    case LOGOUT:
      return updateObject(state, { isLoggedIn: false });
    default:
      return state;
  }
};

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const updateUsersList = (userList) => {
  let arr = {};
  Object.values(userList).map((user) => {
    const obj = {
      [user.email]: { ...user },
    };
    arr = { ...arr, ...obj };
    return null;
  });
  return arr;
};

export default reducer;
