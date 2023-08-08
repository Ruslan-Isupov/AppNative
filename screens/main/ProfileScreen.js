import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import PostsItem from "../../components/PostsItem";

const d = Dimensions.get("window");
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/bG.png")}
      >
        <View style={styles.userBox}>
          <View style={styles.avatarBox}>
            <Image
              source={require("../../assets/images/person.png")}

              // style={styles.buttonImageIconStyle}
            />
            <TouchableOpacity
              style={styles.buttonDeleteAvatar}
              activeOpacity={0.8}
            >
              <Image
                source={require("../../assets/images/delete.png")}
                // style={styles.buttonImageIconStyle}
              />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.userDescription}> */}
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 30,
              color: "#212121",
              marginTop: -24,
            }}
          >
            Natali Romanova
          </Text>
          <PostsItem />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // position: "absolute",
    backgroundColor: "#fff",

    width: d.width,
    height: d.height,
    // alignItems: "center",
  },
  userBox: {
    // flexDirection: "row",
    // flex: 1,

    marginTop: 43,
    height: 690,
    borderTopLeftWidth: 1,
    borderTopRightWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "flex-end",
  },
  avatarBox: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    // position: "absolute",
    alignSelf: "center",
    top: -60,
  },
  buttonDeleteAvatar: {
    position: "absolute",
    right: -14,
    bottom: 14,
    zIndex: 999,
  },
  userDescription: {
    marginTop: 0,
    flex: 1,
    marginLeft: 8,
  },
  postBox: {
    // flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
  },
  postDescription: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 8,
    justifyContent: "space-between",
  },
  commentsBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  locationBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  likesBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default ProfileScreen;
