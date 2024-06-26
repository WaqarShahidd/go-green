import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./src/screens/Auth/SplashScreen";
import Navigation from "./src/navigation/Navigation";
import { UserProvider } from "./src/constants/context";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
