import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { getDatabase, ref, set, push, onValue } from "firebase/database";

import Comment from "../../components/Comment";
import { takeComment } from "../../redux/auth/authOperations";
const d = Dimensions.get("window");

const CommentsScreen = ({ route }) => {
  const [view, setView] = useState("");

  const { postId } = route.params;
  const [posts, setPosts] = useState("");
  const navigation = useNavigation();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [marginAdapt, setMarginAdapt] = useState(0);

  const submitComment = () => {
    Keyboard.dismiss();
    // console.log(e);
  };

  const dispatch = useDispatch();
  const { nickName, comment } = useSelector((state) => state.auth);

  // Це працю'
  useEffect(() => {
    if (view) {
      takeComment(view);
    }
  }, [view]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const data = getDatabase();
    const starCountRef = ref(data, `posts/${postId}/comments`);
    onValue(starCountRef, async (snapshot) => {
      const dataBase = await snapshot.val();
      console.log(Object.values(dataBase));
      setPosts(Object.values(dataBase));
    });
  };

  // const getAllPosts = async () => {
  //   db.firestore()
  //     .collection("posts")
  //     .doc(postId)
  //     .collection("comments")
  //     .onSnapshot((data) =>
  //       setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //     );
  // };

  const createPost = async () => {
    const database = getDatabase();
    const postListRef = ref(database, `posts/${postId}/comments`, +postId);
    const newPostRef = push(postListRef);
    console.log(comment);
    set(newPostRef, {
      nickName: nickName,
      comment: view ? view : "Awesome",
    });
  };

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setMarginAdapt(-2);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setMarginAdapt(0);
  });
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          {/* <SafeAreaView style={styles.container}> */}

          <View
            style={{
              ...styles.form,
              width: dimensions,
              // marginBottom: isShowKeyboard === true ? -225 : 0,
              marginBottom: marginAdapt,
            }}
          >
            <View style={styles.postBox}>
              <Image
                style={{
                  borderRadius: 8,
                  width: 343,
                }}
                source={require("../../assets/images/dawn.png")}
              />
            </View>
            {/* Закінчився бекграунд */}
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View>
                  {/* <Comment /> */}
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
                          {item.comment}
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
                        source={require("../../assets/images/user.png")}
                      />
                    </View>
                  </View>
                </View>
                // {/* Закінчились коменти */}
              )}
              keyExtractor={(item, indx) => {
                // item.id;
                indx.toString();
              }}
            />
            {/* // </SafeAreaView> */}
            {/* // Інпуь відправляти */}
            <View
            // style={{ marginTop: 16 }}
            >
              <TextInput
                name={"comment"}
                style={styles.input}
                textAlign={"left"}
                onFocus={() => setIsShowKeyboard(true)}
                value={view}
                placeholder={"Коментувати..."}
                onChangeText={setView}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 40,
                  right: 33,
                }}
                onPress={createPost}
              >
                <Image
                  // style={styles.passwordCheck}
                  source={require("../../assets/images/send.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postBox: {
    // flexDirection: "row",
    // alignItems: "center",
    // marginTop: 15,
    alignSelf: "center",
  },

  form: {
    borderTopLeftWidth: 1,
    borderTopRightWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",

    // height: 489,
    alignItems: "center",
    marginTop: 32,
  },
  input: {
    width: 343,
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 50,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    marginHorizontal: 16,
    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginTop: 31,
  },

  btn: {
    borderWidth: 1,
    height: 51,
    marginTop: 42,

    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
        borderRadius: 100,
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
        borderRadius: 100,
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
    fontSize: 18,
    fontFamily: "Roboto-Regular",
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
  headerAdvice: {
    marginRight: 4,

    color: "#1B4371",
  },

  boxAdvice: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    // width: 159,
    // alignItems: "center",
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

export default CommentsScreen;
