import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  //   const emailVerify = (email) => {
  //     //return auth.createUserWithEmailAndPassword(email);
  //     auth.email
  //   };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const googleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  };

  const facebookLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    return auth.signInWithPopup(provider);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    googleLogin,
    facebookLogin,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
