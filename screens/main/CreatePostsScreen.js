import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { db, storage } from "../../firebase/config";
import { ref as sRef } from "firebase/storage";

const defaultLocation = {
  latitude: 50.516339,
  longitude: 30.602185,
  latitudeDelta: 0.001,
  longitudeDelta: 0.006,
};
// import { ref } from "firebase/storage";

// import { collection, addDoc } from "firebase/firestore";

// import { storage } from "../../firebase/config";
import { getDatabase, set, ref } from "firebase/database";
import {
  uploadBytes,
  // uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const d = Dimensions.get("window");
const metadata = {
  contentType: "image/jpeg",
};
const CreatePostsScreen = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [marginAdapt, setMarginAdapt] = useState(0);

  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();

    const photoRef = sRef(storage, `postImage/${uniquePostId}`);
    // const photoRef = ref(storage, `postImage/${uniquePostId}`);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        // console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", photo, true);
      xhr.send(null);
    });
    await uploadBytes(photoRef, blob, metadata);

    const processedPhoto = await getDownloadURL(photoRef);
    return processedPhoto;
  };

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();

    setPhoto(uri);
  };
  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    // console.log(location);

    const uniquePostId = Date.now().toString();

    const data = getDatabase();
    // await set(ref(data, "posts/" + userId)),

    await set(ref(data, "posts/" + uniquePostId), {
      photo,
      comment,
      location: location ? location.coords : defaultLocation,
      userId,
      nickName,
      id: uniquePostId,
    });
  };

  const sendPhoto = () => {
    const image = photo;
    uploadPostToServer();
    // uploadPhotoToServer();
    navigation.navigate("Публікації", { image, comment, location });
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
                value={comment}
                placeholder={"Назва..."}
                onChangeText={setComment}
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
                // value={location ? location : "Kyiv"}
                value={location}
                placeholder={"Місцевість..."}
                onChangeText={setLocation}
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
              onPress={
                sendPhoto
                // navigation.navigate("Home", { photo, dataFormPost });
                // submitPostForm("");
                // setPhoto("");
                // setCameraRef("");
                // uploadPhotoToServer();
              }
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
