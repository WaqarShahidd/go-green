import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { colors } from "../../theme/theme";
import HeaderLogo from "../../components/HeaderLogo";
import TrendingNews from "../../components/TrendingNews";
import BottomOptions from "../../components/BottomOptions";

const { fontScale } = Dimensions.get("window");

const AboutUs = () => {
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <HeaderLogo />

        <View style={styles.subContainer}>
          <Image
            source={require("../../../assets/images/about.jpg")}
            style={styles.aboutImage}
          />

          <Text style={styles.title}>About Us</Text>

          <Text style={styles.text}>
            Our mission is simple yet powerful: to help individuals struggling
            with drug and alcohol problems find hope, healing, and lasting
            recovery through modern alternative therapies.{"\n\n"}We believe in
            a holistic approach that addresses not only the physical aspects of
            addiction but also the emotional, mental, and spiritual well-being
            of our clients.
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <TrendingNews />
        </View>
      </ScrollView>

      <BottomOptions />
    </>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  subContainer: { marginHorizontal: 20, marginTop: 15 },
  aboutImage: {
    height: 225,
    width: "100%",
    borderRadius: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24 / fontScale,
    color: colors.textColor,
    fontWeight: "700",
    marginTop: 20,
  },
  text: {
    color: "rgba(51,51,51, 0.9)",
    fontSize: 16 * fontScale,
    fontWeight: "400",
    marginTop: 15,
    lineHeight: 20,
  },
});
