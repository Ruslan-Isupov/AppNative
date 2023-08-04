// Home.js
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import PostsItem from "../../components/PostsItem";

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <Image
          stele={{ borderRadius: 16 }}
          source={require("../../assets/images/avatar.png")}
        />
        <View style={styles.userDescription}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 13,
              color: "#212121",
            }}
          >
            Natali Romanova
          </Text>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 11,
              color: "#212121",
            }}
          >
            email@example.com
          </Text>
        </View>
      </View>
      <PostsItem marginTop={35} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  userDescription: {
    flex: 1,
    marginLeft: 8,
  },
});
export default Home;
