import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// const initialState = {
//   email: "",
//   password: "",
// };
const d = Dimensions.get("window");

const PostsScreen = ({ route }) => {
  const [postsList, setPostsList] = useState("");
  const navigation = useNavigation();
  console.log(route.params);

  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);

  // const [marginAdapt, setMarginAdapt] = useState(0);
  // const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    if (route.params) {
      setPostsList((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log(postsList);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.headerTitle}>PostsScreen</Text> */}
      <FlatList
        data={postsList}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 350, height: 200 }}
            />
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
    justifyContent: "center",
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
});

export default PostsScreen;
