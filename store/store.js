import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

const middleware = [thunk];

const userInfoData =
  typeof window !== "undefined"
    ? JSON.parse(sessionStorage.getItem("kunyoIsMarketing_userInfo"))
    : null || typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("kunyoIsMarketing_userInfo"))
    : null || null;

const userVerification =
  typeof window !== "undefined"
    ? localStorage.getItem("verified")
    : null || typeof window !== "undefined"
    ? sessionStorage.getItem("verified")
    : null || null;

const initialState = {
  userInfo: {
    userInfo: userInfoData,
  },
  userVerified: userVerification,
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
