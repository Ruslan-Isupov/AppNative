import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./screens/auth/RegistrationScreen";

import PostsScreen from "./screens/main/PostsScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";

import ProfileScreen from "./screens/main/ProfileScreen";

import Ionicons from "@expo/vector-icons/Ionicons";

// import { useNavigation } from "@react-navigation/native";
// const navigation = useNavigation();
import { TouchableOpacity, Image } from "react-native";
// import { AntDesign } from "@expo/vector-icons";
const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();
let iconName = "";
const checkPrivateRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerTitleAlign: "center" }}
      >
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTabs.Navigator
      //   tabBarOptions={{ showLabel: false }}

      screenOptions={({ route }) => ({
        // tabBarItemStyle: { width: "auto" },
        // tabBarStyle: { padding: 0 },
        // safeAreaInsets={{ left: 0, right: 0 }}
        headerTitleAlign: "center",
        tabBarIcon: ({ focused, color, size, styles }) => {
          let iconName;

          if (route.name === "PostsScreen") {
            iconName = "grid-outline";
          } else if (route.name === "CreatePostsScreen") {
            iconName = "add-outline";
            color = "#FFFFFF";
            //   styles = style={{backgroundColor:"orange"}}
          } else if (route.name === "ProfileScreen") {
            iconName = "person-outline";
          }
          if (route.name === "CreatePostsScreen") {
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                style={{
                  flex: 1,
                  width: 70,
                  height: 40,
                  backgroundColor: "#FF6C00",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: 20,
                  // padding: 0,
                  // margin: 0,
                }}
              />
            );
          } else {
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                // style={{ padding: 0, margin: 0 }}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: iconName === "add-outline" ? "#FFFFFF" : "#FF6C00",
        inactiveTintColor: "#212121CC",
        showLabel: false,
        safeAreaInsets: { left: 0, right: 0 },
        // labelStyle: {
        //   margin: 0,
        //   padding: 0,
        // },
        // tabStyle: {
        //   paddingLeft: 0,
        //   paddingRight: 0,

        //   margin: 0,
        // },
      }}
    >
      <MainTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 5,
                alignSelf: "center",
              }}
              // onPress={() => navigation.getParam("logout")}
            >
              <Image source={require("./assets/images/logOut.png")} />
            </TouchableOpacity>
          ),
        }}
      />
      <MainTabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Cтворити публікації",
        }}

        // options={({ navigation }) => ({
        //   tabBarButton: (props) => (
        //     <TouchableOpacity
        //       {...props}
        //       onPress={() => navigation.navigate("CreatePostsScreen")}
        //     />
        //   ),
        // })}
      />
      <MainTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </MainTabs.Navigator>
  );
};
export default checkPrivateRoute;
