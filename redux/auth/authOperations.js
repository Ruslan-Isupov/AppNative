import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import db from "../../firebase/config";
import selectAuth from "../selectors";
// import { authSlice } from "./authSlice";
// const { updateUser, authStateChange, authSignOut } = authSlice.actions;

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { authStateChange } from "./authSlice";
import { updateUser } from "./authSlice";
import { authSignOut } from "./authSlice";
import { authComment } from "./authSlice";

export const registerDB =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      if (user) {
        try {
          await updateProfile(user, {
            displayName: nickname,
          });
        } catch (error) {
          throw error;
        }
      }

      const { displayName, uid } = await auth.currentUser;

      const userUpdateProfile = {
        nickName: displayName,
        userId: uid,
      };

      dispatch(updateUser(userUpdateProfile));

      // dispatch(
      //   updateUser({
      //     nickName: displayName,
      //     userId: uid,
      //   })
      // );
    } catch (error) {
      throw error.message;
      console.log(error.message);
    }
  };

export const loginDB =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      // const value = useSelector(selectAuth);

      // const credentials = await auth.signInWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );

      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        }
      );

      dispatch(authStateChange({ stateChange: true }));
      // return credentials.user;
    } catch (error) {
      throw error.message;
    }
  };

export const takeComment = (comment) => async (dispatch, getState) => {
  try {
    console.log(comment);

    dispatch(authComment(comment));
    return comment;
  } catch (error) {
    throw error.message;
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  console.log("authStateChangeUser");
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        nickName: user.displayName,
        userId: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUser(userUpdateProfile));
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSignOut());
};
