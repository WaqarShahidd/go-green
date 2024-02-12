import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import GradientBg from "../../components/GradientBg";
import { colors, theme } from "../../theme/theme";
import CustomBtn from "../../components/CustomBtn";
import { useNavigation } from "@react-navigation/native";

const { fontScale } = Dimensions.get("window");

const SplashScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <GradientBg /> */}

      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.titleText1}>
          GO <Text style={{ color: colors.primary }}>GREEN</Text>
        </Text>
        <Text style={styles.titleText2}>STAY CLEAN</Text>

        <Text style={styles.subtitle}>
          Track Your Sobriety With{" "}
          <Text style={{ color: colors.primary }}>Go Green Stay Clean</Text>
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={{ marginBottom: 10 }}>
          <CustomBtn
            text="Login"
            primary={true}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <CustomBtn
          text="Sign Up"
          primary={false}
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#DAF2EF" },
  logoContainer: {
    marginTop: "25%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { height: 200, width: "70%" },
  titleText1: {
    marginTop: 15,
    fontSize: 28 / fontScale,
    color: colors.secondary,
    letterSpacing: 2,
    paddingBottom: 5,
    fontWeight: "700",
  },
  titleText2: {
    fontSize: 28 / fontScale,
    color: colors.secondary,
    letterSpacing: 2,
  },
  subtitle: {
    marginTop: 35,
    fontSize: 28 / fontScale,
    color: colors.secondary,
    textAlign: "center",
    maxWidth: "90%",
    fontWeight: "700",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 18,
    marginBottom: 20,
  },
});
