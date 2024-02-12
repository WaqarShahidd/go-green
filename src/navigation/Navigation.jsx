import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/Auth/SplashScreen";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
import HomeScreen from "../screens/Home/HomeScreen";
import AboutUs from "../screens/About/AboutUs";
import SoberCalculator from "../screens/Calculator/SoberCalculator";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="SoberCaculator" component={SoberCalculator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
