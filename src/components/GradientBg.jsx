import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const GradientBg = () => {
  return (
    <View style={{ position: "absolute", height: "100%", width: "100%" }}>
      <LinearGradient
        colors={["#DAF2EF", "#F3F9FF"]}
        start={[0.1, 0.9]}
        end={[0.1, 0.1]}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default GradientBg;

const styles = StyleSheet.create({});
