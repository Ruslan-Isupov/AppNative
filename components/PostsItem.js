import React from "react";

import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const PostsItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.postBox}>
        <Image
          style={{
            borderRadius: 8,
            width: 343,
          }}
          source={require("../assets/images/postImg.jpg")}
        />
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: 16,
            color: "#212121",
            marginTop: 8,
          }}
        >
          Ліс
        </Text>
        <View style={styles.postDescription}>
          <View style={styles.postActivity}>
            <View style={styles.commentsBox}>
              {/* <Image
              stele={{ borderRadius: 8 }}
              source={require("../assets/images/postImg.jpg")}
            /> */}
              <Ionicons
                name={"chatbubble-outline"}
                size={24}
                color={"#FF6C00"}
              />
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  fontSize: 16,
                  color: "#212121",
                }}
              >
                0
              </Text>
            </View>

            <View style={styles.likesBox}>
              <Ionicons
                name={"md-thumbs-up-sharp"}
                size={24}
                color={"#FF6C00"}
              />
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 16,
                  color: "#212121",
                }}
              >
                154
              </Text>
            </View>
          </View>
          <View style={styles.locationBox}>
            <Ionicons name={"location-outline"} size={24} color={"#BDBDBD"} />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                color: "#212121",
                textDecorationLine: "underline",
              }}
            >
              {/* Ivano-Frankivs'k Region, */}
              Ukraine
            </Text>
          </View>
        </View>
      </View>
    </View>
    // /* <View style={styles.postBox}>
    //   <Image
    //     stele={{ borderRadius: 8 }}
    //     source={require("../assets/images/avatar.png")}
    //   />
    //   <Text
    //     style={{
    //       fontFamily: "Roboto-Medium",
    //       fontSize: 13,
    //       color: "#212121",
    //     }}
    //   >
    //     Ліс
    //   </Text>
    //   <View style={styles.postDescription}>
    //     <Text
    //       style={{
    //         fontFamily: "Roboto-Medium",
    //         fontSize: 13,
    //         color: "#212121",
    //       }}
    //     >
    //       0
    //     </Text>
    //     <Text
    //       style={{
    //         fontFamily: "Roboto-Regular",
    //         fontSize: 11,
    //         color: "#212121",
    //       }}
    //     >
    //       Ivano-Frankivs'k Region, Ukraine
    //     </Text>
    //   </View>
    // </View>
    // <FlatList
    //   // data={DATA}
    //   renderItem={renderItem} */}
    //   // keyExtractor={(item) => item.id}
    //   // extraData={selectedId}
    // />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // paddingLeft: 16,
    // paddingRight: 16,
    // justifyContent: "center",
  },
  postBox: {
    // flexDirection: "row",
    // alignItems: "center",
    marginTop: 32,
  },
  postDescription: {
    flex: 1,
    flexDirection: "row",
    // marginLeft: 8,
    marginTop: 8,
    justifyContent: "space-between",
  },
  postActivity: {
    flex: 1,
    flexDirection: "row",
    // marginRight: 24,
    gap: 24,
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
export default PostsItem;
