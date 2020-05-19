import {
  SIGN_UP_SUCCESS,
  UPDATE_SIGN_IN_RESPONSE,
  SIGN_UP_ERROR,
  AUTH_LOGIN_SUCESS,
} from "./constants";

const initialState = {
  conversations: [],
  loggedInUser: {},
  token: null,
  userId: null,
  signUpError: null,
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      const user = { [action.payload.email]: { ...action.payload } };
      const userObj = updateObject(state.loggedInUser, user);
      const loggedInUser = {
        loggedInUser: userObj,
      };
      return updateObject(state, loggedInUser);
    case UPDATE_SIGN_IN_RESPONSE:
      console.log("UPDATE_SIGN_IN_RESPONSE", action);

      return updateObject(state, {
        token: action.payload.data.idToken,
        userId: action.payload.data.localId,
      });
    case SIGN_UP_ERROR:
      console.log("action", action);
      return updateObject(state, { signUpError: action.error.message });
    case AUTH_LOGIN_SUCESS:
      return updateObject(state, { isLoggedIn: true });
    default:
      return state;
  }
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export default reducer;
