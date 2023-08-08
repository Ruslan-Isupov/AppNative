import "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { authSignOutUser } from "./redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./screens/auth/RegistrationScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import PostsScreen from "./screens/main/PostsScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";

import Ionicons from "@expo/vector-icons/Ionicons";

import { TouchableOpacity, Image } from "react-native";
const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

let iconName = "";

const checkPrivateRoute = (isAuth) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

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
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor:
          iconName === "add-outline" ? "#FFFFFF" : "#FF6C00",
        tabBarInactiveTintColor: "#212121CC",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            left: 0,
            right: 0,
          },
        ],

        headerTitleAlign: "center",
        tabBarIcon: ({ focused, color, size, styles }) => {
          let iconName;

          if (route.name === "PostsScreen") {
            iconName = "grid-outline";
          } else if (route.name === "CreatePostsScreen") {
            iconName = "add-outline";
            color = "#FFFFFF";
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
    >
      <MainTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainTabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Cтворити публікації",
        }}
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
