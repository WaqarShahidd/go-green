import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/Auth/SplashScreen";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
import HomeScreen from "../screens/Home/HomeScreen";
import AboutUs from "../screens/About/AboutUs";
import SoberCalculator from "../screens/Calculator/SoberCalculator";
import Notifications from "../screens/Notifications.jsx/Notifications";
import { onAuthStateChanged } from "firebase/auth";
import { useUser } from "../constants/context";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import EditProfile from "../screens/Profile/EditProfile";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [authStateChecked, setAuthStateChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setisAuthenticated(true);
        setAuthStateChecked(true);
        console.log("logged in", isAuthenticated);
      } else {
        setAuthStateChecked(true);
        console.log("logged out");
      }
    });

    return () => unsubscribe();
  }, [setisAuthenticated]);

  const { userData, GetUser, setisAuthenticated, isAuthenticated } = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
        initialRouteName={isAuthenticated ? "Home" : "Login"}
      >
        {!isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="SoberCalculator" component={SoberCalculator} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
