import React, { useState, useEffect } from "react";

import "react-native-gesture-handler";
import UserCheck from "./components/UserCheck";

// import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./redux/store";

// import checkPrivateRoute from "./routerChecker";
import { useFonts } from "expo-font";

// import { auth } from "./firebase/config";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <UserCheck />
    </Provider>
  );
}
