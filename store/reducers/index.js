import { combineReducers } from "redux";

import {
  userLoginReducer,
  userRegisterReducer,
  userVerifiedReducer,
} from "./userReducer";

export default combineReducers({
  userRegister: userRegisterReducer,
  userInfo: userLoginReducer,
  userVerified: userVerifiedReducer,
});
