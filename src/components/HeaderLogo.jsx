import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const HeaderLogo = () => {
  return (
    <View
      style={{
        paddingTop: "10%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ height: 50, width: 50 }}
      />
    </View>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({});
