import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
const initialState = {
  nameImg: "",
  location: "",
};
const d = Dimensions.get("window");

const CreatePostsScreen = () => {
  const navigation = useNavigation();

  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [marginAdapt, setMarginAdapt] = useState(0);

  const [dataFormPost, setDataFormPost] = useState(initialState);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const submitPostForm = () => {
    Keyboard.dismiss();
    console.log(dataFormPost);
    setDataFormPost(initialState);
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
  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    // const location = await Location.getCurrentPositionAsync();
    setPhoto(uri);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <Camera
            style={styles.camera}
            // type={type}
            ref={setCameraRef}
          >
            {/* <View style={styles.pictureBox}> */}
            {photo && (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: photo }}
                  style={{ width: 343, height: 240 }}
                />
              </View>
            )}
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                backgroundColor: "#FFFFFF",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={takePhoto}
              // {async () => {
              //   if (cameraRef) {
              //     const { uri } = await cameraRef.takePictureAsync();
              //     await MediaLibrary.createAssetAsync(uri);
              //     const location = await Location.getCurrentPositionAsync();
              //     setPhoto(uri);
              //     takePhoto;
              //   }
              // }}
            >
              <Image source={require("../../assets/images/addPicture.png")} />
            </TouchableOpacity>
          </Camera>
          <Text style={styles.headerTitle}>Завантажте фото</Text>
          <View
            style={{
              ...styles.form,
              width: dimensions,
              // marginBottom: isShowKeyboard === true ? -225 : 0,
              marginBottom: marginAdapt,
            }}
          >
            <View
              style={{
                borderBottomColor: "#E8E8E8",
                borderBottomWidth: 2,
                width: 343,
                alignSelf: "center",
              }}
            >
              <TextInput
                style={styles.input}
                name="hola"
                textAlign={"left"}
                onFocus={() => setIsShowKeyboard(true)}
                value={dataFormPost.nameImg}
                placeholder={"Назва..."}
                // onChange={(nativeEvent) => console.log("LoginScreen")}
                onChangeText={(value) =>
                  setDataFormPost((prevState) => ({
                    ...prevState,
                    nameImg: value,
                  }))
                }
              />
            </View>
            <View
              style={{
                marginTop: 16,
                borderBottomColor: "#E8E8E8",
                borderBottomWidth: 2,
                width: 343,
                alignSelf: "center",
              }}
            >
              <TextInput
                style={{
                  ...styles.input,
                  paddingLeft: 15,
                }}
                textAlign={"left"}
                onFocus={() => setIsShowKeyboard(true)}
                value={setDataFormPost.location}
                placeholder={"Місцевість..."}
                onChangeText={(value) =>
                  setDataFormPost((prevState) => ({
                    ...prevState,
                    location: value,
                  }))
                }
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 15,
                  left: 2,
                }}
                onPress={() => {
                  navigation.navigate("PostsScreen", { screen: "MapScreen" });
                }}
              >
                <Image
                  style={styles.passwordCheck}
                  source={require("../../assets/images/location.png")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => {
                navigation.navigate("Home", { photo, dataFormPost });
                // submitPostForm("");
                // setPhoto("");
                // setCameraRef("");
              }}
            >
              <Text style={styles.btnTitle}>Опублікувати</Text>
            </TouchableOpacity>
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
  camera: {
    // flex: 1,
    width: 343,
    height: 240,
    marginTop: 32,
    alignSelf: "center",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  // pictureBox: {
  //   alignSelf: "center",
  // },
  imageWrapper: {
    width: 343,
    height: 240,
    // borderRadius: 8,
    backgroundColor: "#E8E8E8",
    // justifyContent: "center",
    positiom: "absoute",
    top: 14,
    left: 0,
    marginTop: 32,
  },
  form: {
    borderTopLeftWidth: 1,
    borderTopRightWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    height: 489,
    marginTop: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    // outline: "none",
    borderBottomWidth: 1.0,
    borderBottomColor: "red",
    height: 50,
    // borderRadius: 6,
    padding: 0,
    backgroundColor: "#FFFFFF",
    color: "#BDBDBD",
    marginHorizontal: 16,
    // paddingLeft: 16,
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
        backgroundColor: "#F6F6F6",
        borderColor: "transparent",
        borderRadius: 100,
      },
      android: {
        backgroundColor: "#F6F6F6",
        borderColor: "transparent",
        borderRadius: 100,
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#f0f8ff" : "#BDBDBD",
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  header: {
    alignItems: "center",
    marginBottom: 33,
  },
  headerTitle: {
    fontSize: 16,
    color: "#BDBDBD",
    //  paddingLeft:16,
    marginLeft: 16,
    fontFamily: "Roboto-Medium",
    marginTop: 8,
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
    tintColor: "#1B4371",
    // fontFamily: "Roboto-Regular",
    // fontSize: 16,
  },
});

export default CreatePostsScreen;
