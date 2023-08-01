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

const initialState = {
  email: "",
  password: "",
};
const d = Dimensions.get("window");
export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dataFormLogin, setDataFormLogin] = useState(initialState);

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
    setDataFormLogin(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/bG.png")}
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
                  onChange={(nativeEvent) => console.log("LoginScreen")}
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
                  secureTextEntry={true}
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
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                // onPress={keyboardHide}
                onPress={submitLoginForm}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>
              <View style={styles.boxAdvice}>
                <Text style={styles.headerAdvice}>
                  Немає акаунту? Зараєструватися
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    width: 252,
    height: 19,
    color: "#1B4371",
  },
  boxAdvice: {
    alignItems: "center",
    marginTop: 16,
  },
});
