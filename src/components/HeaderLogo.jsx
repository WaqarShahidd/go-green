import { StyleSheet, Text, View, Image } from "react-native";
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
    paddingTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { height: 50, width: 50 },
});
