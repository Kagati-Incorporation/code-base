import * as types from "../types";
import axios from "axios";
import Notification from "@/components/Notifications";
import { API } from "config";

const userRegisterAction = (registerData, router) => async (dispatch) => {
  dispatch({
    type: types.USER_REGISTER_REQUEST,
  });

  try {
    const res = await axios.post(`${API}/users/register/`, registerData);

    dispatch({
      type: types.USER_REGISTER_SUCCESS,
      payload: res.data,
      loading: false,
    });
    Notification(
      "success",
      "Sign up successful! Please check your email for verification link."
    );
    router.push("/login");
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload: error,
      loading: false,
    });
  }
};

const userLoginAction = (token, remember, router) => async (dispatch) => {
  console.log(token);
  dispatch({
    type: types.USER_LOGIN_REQUEST,
  });

  try {
    const { data } = await axios.post(`${API}/users/login/`, {
      id_token: token,
    });

    if (data.user && data.user.is_active === true) {
      dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: data,
        loading: false,
      });
      window.sessionStorage.setItem(
        "kunyoIsMarketing_userInfo",
        JSON.stringify(data)
      );
      if (remember) {
        window.localStorage.setItem(
          "kunyoIsMarketing_userInfo",
          JSON.stringify(data)
        );
      }
      router.push("/");
    } else {
      router.push("/HowItWorks/HowItWorks");
    }
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_FAIL,
      payload: error,
      loading: false,
    });
  }
};

const logOutAction = (router) => async (dispatch) => {
  localStorage.removeItem("kunyoIsMarketing_userInfo");
  sessionStorage.removeItem("kunyoIsMarketing_userInfo");
  /*   localStorage.removeItem("verified");
  sessionStorage.removeItem("verified");
  window.localStorage.setItem("CREDENTIALS_FLUSH", Date.now().toString());
  window.localStorage.removeItem("CREDENTIALS_FLUSH"); */
  dispatch({ type: types.USER_SIGN_OUT });
  router.push("/");
};

export { userRegisterAction, userLoginAction, logOutAction };
