import { useFonts } from "expo-font";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
    </>
  );
}
