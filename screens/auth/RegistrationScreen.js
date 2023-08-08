import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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
  Image,
  Button,
} from "react-native";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";

import { registerDB } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
  nickname: "",
};
const d = Dimensions.get("window");
const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dataFormRegistration, setDataFormRegistration] =
    useState(initialState);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [marginAdapt, setMarginAdapt] = useState(0);

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setMarginAdapt(-160);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setMarginAdapt(0);
  });
  const dispatch = useDispatch();

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
  const submitRegisterForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(registerDB(dataFormRegistration));
    setDataFormRegistration(initialState);
    // console.log(4);
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

                marginBottom: marginAdapt,
              }}
            >
              <View style={styles.avatarBox}>
                <TouchableOpacity
                  style={styles.buttonAddAvatar}
                  activeOpacity={0.8}
                >
                  <Image
                    source={require("../../assets/images/add.png")}
                    style={styles.buttonImageIconStyle}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Реєстрація</Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  name="hola"
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={dataFormRegistration.nickname}
                  placeholder={"Логін"}
                  // onChange={(nativeEvent) => console.log("Hi")}
                  onChangeText={(value) =>
                    setDataFormRegistration((prevState) => ({
                      ...prevState,
                      nickname: value,
                    }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={dataFormRegistration.email}
                  placeholder={"Адреса електронної пошти"}
                  onChangeText={(value) =>
                    setDataFormRegistration((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
              </View>
              <View
                style={{
                  marginTop: 16,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    display: "flex",
                    alignItems: "center",
                  }}
                  textAlign={"left"}
                  secureTextEntry={isSecureEntry}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={dataFormRegistration.password}
                  placeholder={"Пароль"}
                  onChangeText={(value) =>
                    setDataFormRegistration((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    // top: "50%",
                    top: 14.5,

                    right: 32,

                    // transform: [{ translate: "(-50%)" }],
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
                // onPress={keyboardHide}
                // onPress={submitLoginForm}
                onPress={
                  submitRegisterForm
                  // navigation.navigate("PostsScreen");
                }
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.boxAdvice}

                // onPress={() => {
                //   navigation.navigate("Login");
                // }}
              >
                <Text style={styles.headerAdvice}>
                  Вже є акаунт?
                  <Text
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                    style={{
                      ...styles.headerAdvice,
                      textDecorationLine: "underline",
                    }}
                  >
                    Увійти
                  </Text>
                </Text>
              </TouchableOpacity>
              {/* </View> */}
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
    // zIndex: 9998,
    // alignItems: "center",
  },
  form: {
    borderTopLeftWidth: 1,
    borderTopRightWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    height: 549,

    marginBottom: 0,
    // alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 50,
    borderRadius: 6,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    marginHorizontal: 16,
    // padding: 0,
    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },

  avatarBox: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    alignSelf: "center",
    top: -60,
  },
  buttonAddAvatar: {
    position: "absolute",
    right: -12,
    bottom: 14,
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
    fontSize: 16,
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
    marginTop: 92,
  },
  headerAdvice: {
    // width: 158,
    marginRight: 4,
    // height: 19,
    color: "#1B4371",
  },
  boxAdvice: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    // width: 159,
    // rowGap: 15,

    // alignItems: "center",
  },
  passwordCheck: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
export default RegistrationScreen;
