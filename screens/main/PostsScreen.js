import React, { useState, useEffect } from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../nestedScreens/Home";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={Home}
        // options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
