import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import Settings from "../screens/Profile/Settings";
import ChangePassword from "../screens/Profile/ChangePassword";
import LoadingScreen from "../components/LoadingScreen";
import ResetPassword from "../screens/Auth/ResetPassword";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { userData, GetUser, setisAuthenticated, isAuthenticated } = useUser();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
  //     if (user) {
  //       setisAuthenticated(true);
  //       console.log("logged in");
  //     } else {
  //       setisAuthenticated(false);
  //       console.log("logged out");
  //     }
  //   });

  //   return unsubscribe;
  // }, [setisAuthenticated]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      initialRouteName={isAuthenticated ? "Home" : "SplashScreen"}
    >
      {!isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Reset" component={ResetPassword} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="SoberCalculator" component={SoberCalculator} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Setting" component={Settings} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
