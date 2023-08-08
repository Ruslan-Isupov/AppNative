import React, { useState, useEffect } from "react";
// import { moduleName } from "react-native";
import { useDispatch } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";
import Home from "../nestedScreens/Home";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Image, TouchableOpacity } from "react-native";
const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedScreen.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <NestedScreen.Screen
        name="Публікації"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 5,
                alignSelf: "center",
              }}
              onPress={() => dispatch(signOut)}
            >
              <Image source={require("../../assets/images/logOut.png")} />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Коментарі" component={CommentsScreen} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
