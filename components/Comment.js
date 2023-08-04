import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";

const Comment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.commentWrapper}>
        <View style={styles.boxComment}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 13,
              color: "#212121",
              marginTop: 8,
            }}
          >
            A fast 50mm like f1.8 would help with the bokeh. I’ve been using
            primes as they tend to get a bit sharper images.
          </Text>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 10,
              color: "#BDBDBD",
              marginTop: 8,
              //   textAlign: "right",
            }}
          >
            09 червня, 2020 | 08:40
          </Text>
        </View>
        <Image
          style={{
            borderRadius: 8,
            width: 28,
            // position: "absolute",
          }}
          source={require("../assets/images/user.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // paddingLeft: 16,
    // paddingRight: 16,
    // justifyContent: "center",
  },
  commentWrapper: {
    width: 343,
    flexDirection: "row",
    justifyContent: "space-between",
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
  boxComment: {
    backgroundColor: "#00000008",
    padding: 16,
    width: 300,
  },
});
export default Comment;
