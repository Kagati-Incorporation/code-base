import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseIndex";
import app from "firebase/app";
import store from "../store/store";
import { logOutAction } from "../store/actions/userAction";
import Notification from "@/components/Notifications";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const getIdTokenForUser = () => auth.currentUser.getIdToken();

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = () => {
    const provider = new app.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    return app.auth().signInWithPopup(provider);
  };

  const signInWithFacebook = () => {
    const provider = new app.auth.FacebookAuthProvider();

    return app.auth().signInWithPopup(provider);
  };

  const getCurrentUser = () => {
    return auth.currentUser;
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const isVerified = () => {
    let user = auth.currentUser;
    return user.emailVerified;
  };

  const getVerification = () => {
    let user = auth.currentUser;
    user.sendEmailVerification();
  };

  const changePassword = (password, email) => {
    console.log("change password");
    console.log(password, email);

    auth
      .signInWithEmailAndPassword(email, password.old_password)
      .then(() => {
        let user = auth.currentUser;
        user
          .updatePassword(password.new_password)
          .then(function () {
            Notification("success", "Password changed successfully");
            store.dispatch(logOutAction());
          })
          .catch(function (error) {
            console.log(error);
            Notification("error", error && error.message);
          });
      })
      .catch((err) => {
        Notification("error", err && err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    getIdTokenForUser,
    login,
    signInWithGoogle,
    signInWithFacebook,
    getCurrentUser,
    resetPassword,
    isVerified,
    getVerification,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
