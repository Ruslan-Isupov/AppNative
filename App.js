import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import checkPrivateRoute from "./routerChecker";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  const routing = checkPrivateRoute(true);
  if (!fontsLoaded) return null;
  return <NavigationContainer>{routing}</NavigationContainer>;
}
