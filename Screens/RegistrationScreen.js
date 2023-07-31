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
} from "react-native";

const initialState = {
  username: "",
  email: "",
  password: "",
};
const d = Dimensions.get("window");
export default function RegistrationScreen() {
  // const d = Dimensions.get("window");

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);

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

    setstate(initialState);
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
            // keyboardVerticalOffset={Platform.select({
            //   ios: () => 0,
            //   android: () => -100,
            // })}
          >
            <View
              style={{
                ...styles.form,
                width: dimensions,

                // marginBottom: isShowKeyboard === true ? -160 : 0,
              }}
            >
              <View style={styles.avatarBox}>
                <TouchableOpacity
                  style={styles.buttonAddAvatar}
                  activeOpacity={0.9}
                >
                  <Image
                    source={require("../assets/images/add.png")}
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
                  value={state.username}
                  placeholder={"Логін"}
                  onChange={(nativeEvent) => console.log("Hi")}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, username: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 15 }}>
                <TextInput
                  style={styles.input}
                  textAlign={"left"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  placeholder={"Адрес електроної почти"}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  textAlign={"left"}
                  secureTextEntry={isSecureEntry}
                  onFocus={() => setIsShowKeyboard(true)}
                  // icon={
                  //   <TouchableOpacity
                  //     onPress={() => {
                  //       setIsSecureEntry((prev) => !prev);
                  //     }}
                  //   >
                  //     <Text style={styles.passwordCheck}>
                  //       {isSecureEntry ? "Показати" : "Сховати"}
                  //     </Text>
                  //   </TouchableOpacity>
                  // }
                  // iconPosition="right"
                  value={state.password}
                  placeholder={"Пароль"}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>

              <View style={styles.boxAdvice}>
                <Text style={styles.headerAdvice}>Вже є акаунт? Увійти</Text>
              </View>

              {/* 
            {!isShowKeyboard && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
            )}
            {!isShowKeyboard && (
              <View style={styles.boxAdvice}>
                <Text style={styles.headerAdvice}>Вже є акаунт? Увійти</Text>
              </View>
            )}
            {!isShowKeyboard && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
            )}
            {!isShowKeyboard && (
              <View style={styles.boxAdvice}>
                <Text style={styles.headerAdvice}>Вже є акаунт? Увійти</Text>
              </View>
            )} */}
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
    alignItems: "center",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.45)",
    // zIndex: 9998,
    width: d.width,
    height: d.height,
  },
  form: {
    borderTopLeftWidth: 1,
    borderTopRightWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    height: 549,

    // marginBottom: 99,
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

    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    // lineHeight: 1.19,
    // letterSpacing: 0,
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
    width: 158,
    height: 19,
    color: "#1B4371",
  },
  boxAdvice: {
    alignItems: "center",
    marginTop: 16,
  },
  passwordCheck: {
    color: "gray",
  },
});
