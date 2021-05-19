import * as types from "../types";

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userRegister: action.payload,
      };
    case types.USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case types.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case types.USER_SIGN_OUT:
      return {};
    default:
      return state;
  }
};

function userVerifiedReducer(state = {}, action) {
  switch (action.type) {
    case types.SET_USER_VERIFIED:
      return action.payload;
    case types.GET_USER_VERIFIED:
      return action.payload;
    default:
      return state;
  }
}

export { userRegisterReducer, userLoginReducer, userVerifiedReducer };
