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
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// const initialState = {
//   email: "",
//   password: "",
// };
const d = Dimensions.get("window");

const PostsScreen = ({ route }) => {
  const navigation = useNavigation();
  console.log(route.params);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [dataFormLogin, setDataFormLogin] = useState(initialState);
  // const [isSecureEntry, setIsSecureEntry] = useState(true);

  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [marginAdapt, setMarginAdapt] = useState(0);

  // const submitLoginForm = () => {
  //   Keyboard.dismiss();
  //   console.log(dataFormLogin);
  //   setDataFormLogin(initialState);
  // };

  // const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
  //   setMarginAdapt(-225);
  // });
  // const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
  //   setMarginAdapt(0);
  // });
  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width - 20 * 2;
  //     setdimensions(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChange);
  //   };
  // }, []);

  // const keyboardHide = () => {
  //   setIsShowKeyboard(false);
  //   Keyboard.dismiss();
  //   // console.log(dataFormLogin);
  //   // setDataFormLogin(initialState);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>PostsScreen</Text>
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
