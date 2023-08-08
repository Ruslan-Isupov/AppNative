import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { selectAuth } from "../redux/selectors";

import checkPrivateRoute from "../routerChecker";
import { authStateChangeUser } from "../redux/auth/authOperations";

const UserCheck = () => {
  const { stateChange } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const routing = checkPrivateRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default UserCheck;
