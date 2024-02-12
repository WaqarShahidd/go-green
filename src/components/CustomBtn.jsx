import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { colors } from "../theme/theme";

const { fontScale } = Dimensions.get("window");

const CustomBtn = ({ text, primary, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: primary ? colors.primary : "#EEFBF7",
        height: 70,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: primary ? "white" : colors.textColor,
          fontSize: 18 / fontScale,
          fontWeight: "600",
          textTransform: "uppercase",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({});
