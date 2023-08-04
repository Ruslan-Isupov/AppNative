import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Comment from "../../components/Comment";
const initialState = {
  comment: "",
};
const d = Dimensions.get("window");

const CommentsScreen = () => {
  const navigation = useNavigation();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dataFormComment, setDataFormComment] = useState(initialState);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [marginAdapt, setMarginAdapt] = useState(0);

  const submitLoginForm = () => {
    Keyboard.dismiss();
    console.log(dataFormLogin);
    setDataFormLogin(initialState);
  };

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setMarginAdapt(-225);
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
    // console.log(dataFormLogin);
    // setDataFormLogin(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View
            style={{
              ...styles.form,
              width: dimensions,
              // marginBottom: isShowKeyboard === true ? -225 : 0,
              marginBottom: marginAdapt,
            }}
          >
            {/* <PostsItem
            style={{
              alignSelf: "center",
            }}
            /> */}
            <View style={styles.postBox}>
              <Image
                style={{
                  borderRadius: 8,
                  width: 343,
                }}
                source={require("../../assets/images/dawn.png")}
              />
            </View>
            <View>
              <Comment />
            </View>

            <View
            // style={{ marginTop: 16 }}
            >
              <TextInput
                style={styles.input}
                textAlign={"left"}
                onFocus={() => setIsShowKeyboard(true)}
                value={dataFormComment.comment}
                placeholder={"Коментувати..."}
                onChangeText={(value) =>
                  setDataFormComment((prevState) => ({
                    ...prevState,
                    comment: value,
                  }))
                }
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 40,
                  right: 33,
                }}
                // onPress={() => {
                //   setIsSecureEntry((prev) => !prev);
                // }}
              >
                <Image
                  style={styles.passwordCheck}
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
    marginTop: 32,
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
    // width: 252,
    // height: 19,
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
  passwordCheck: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

export default CommentsScreen;
