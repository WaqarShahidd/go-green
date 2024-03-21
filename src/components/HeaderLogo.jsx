import { StyleSheet, Text, View, Image, Platform } from "react-native";
import React from "react";

const HeaderLogo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
    </View>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? "10%" : "7.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { height: 50, width: 50 },
});
