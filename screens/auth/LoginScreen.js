import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginDB } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};
const d = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dataFormLogin, setDataFormLogin] = useState(initialState);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [marginAdapt, setMarginAdapt] = useState(0);

  const submitLoginForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(loginDB(dataFormLogin));
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
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/bG.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                width: dimensions,
                // marginBottom: isShowKeyboard === true ? -225 : 0,
                marginBottom: marginAdapt,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Увійти</Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  name="hola"
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={dataFormLogin.email}
                  placeholder={"Адрес електроної почти"}
                  // onChange={(nativeEvent) => console.log("LoginScreen")}
                  onChangeText={(value) =>
                    setDataFormLogin((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  textAlign={"left"}
                  secureTextEntry={isSecureEntry}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={dataFormLogin.password}
                  placeholder={"Пароль"}
                  onChangeText={(value) =>
                    setDataFormLogin((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 14.5,
                    right: 32,
                  }}
                  onPress={() => {
                    setIsSecureEntry((prev) => !prev);
                  }}
                >
                  <Text style={styles.passwordCheck}>
                    {isSecureEntry ? "Показати" : "Сховати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => {
                  submitLoginForm();
                }}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.9} style={styles.boxAdvice}>
                <Text style={styles.headerAdvice}>
                  Немає акаунту?
                  <Text
                    onPress={() => {
                      navigation.navigate("Registration");
                    }}
                    style={{
                      ...styles.headerAdvice,
                      textDecorationLine: "underline",
                    }}
                  >
                    Зареєструватися
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

  form: {
    borderTopLeftWidth: 1,
    borderTopRightWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    height: 489,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 50,
    borderRadius: 6,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    marginHorizontal: 16,
    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
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

export default LoginScreen;
