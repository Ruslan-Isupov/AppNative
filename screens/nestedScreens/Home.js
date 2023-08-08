import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, onValue } from "firebase/database";

import { Ionicons } from "@expo/vector-icons";

// import { PostItem } from "../../components/";
const d = Dimensions.get("window");

const Home = ({ route }) => {
  const [posts, setPosts] = useState();
  const navigation = useNavigation();

  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const { userId, nickName } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    const data = getDatabase();
    const starCountRef = ref(data, "posts/");
    onValue(starCountRef, async (snapshot) => {
      const dataBase = await snapshot.val();
      // console.log(Object.values(dataBase).id);
      setPosts(Object.values(dataBase));
    });
  };

  useEffect(() => {
    getAllPost();
    // console.log(posts);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarBox}>
        <Image
          source={require("../../assets/images/person.png")}
          style={{ width: 60, height: 60 }}
        />

        <View style={styles.userDescription}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 13,
              color: "#212121",
            }}
          >
            {nickName}
          </Text>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 11,
              color: "#212121",
            }}
          >
            {nickName}@gmail.com
          </Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => {
          // item.id;
          indx.toString();
        }}
        renderItem={({ item }) => (
          <View style={styles.postBox}>
            <Image
              style={{
                borderRadius: 8,
                width: 343,
                height: 200,
              }}
              source={{ uri: item.photo }}
            />
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 16,
                color: "#212121",
                marginTop: 8,
              }}
            >
              {item.comment}
            </Text>
            <View style={styles.postDescription}>
              <View style={styles.postActivity}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.commentsBox}
                  onPress={() =>
                    navigation.navigate("Коментарі", {
                      postId: item.id,
                    })
                  }
                >
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
                </TouchableOpacity>

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
                <Ionicons
                  name={"location-outline"}
                  size={24}
                  color={"#BDBDBD"}
                />
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    color: "#212121",
                    textDecorationLine: "underline",
                    marginRight: 4,
                  }}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      location: item.location,
                    })
                  }
                >
                  Ukraine
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 33,
  },
  headerTitle: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    marginTop: 32,
  },
  postBox: {
    marginTop: 32,
  },
  postDescription: {
    flex: 1,
    flexDirection: "row",
    // marginLeft: 8,
    marginTop: 8,
    justifyContent: "space-between",
  },
  avatarBox: {
    marginLeft: 32,
    flexDirection: "row",
    alignSelf: "center",
  },
  userDescription: {
    marginTop: 0,
    flex: 1,
    marginLeft: 8,
    alignSelf: "center",
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

export default Home;
