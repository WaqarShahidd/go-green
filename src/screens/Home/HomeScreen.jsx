import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import HeaderLogo from "../../components/HeaderLogo";
import { colors } from "../../theme/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import BottomOptions from "../../components/BottomOptions";
import HelpCards from "../../components/HelpCards";
import TrendingNews from "../../components/TrendingNews";
import ShareProgress from "../../components/ShareProgress";
import { useUser } from "../../constants/context";
import SobrietyCounter from "../../components/SobrietyCounter";

const { fontScale } = Dimensions.get("window");

const HomeScreen = () => {
  const { userData, GetUser } = useUser();

  useEffect(() => {
    GetUser();
  }, []);

  const currentHour = new Date().getHours();
  let greetingMessage = "";

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingMessage = "Good Afternoon";
  } else if (currentHour >= 17 && currentHour < 20) {
    greetingMessage = "Good Evening";
  } else {
    greetingMessage = "Good Night";
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <HeaderLogo />

        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text style={styles.headerText1} onPress={GetUser}>
              Hi, {userData?.userName}
            </Text>
            <Text style={styles.headerText2}>{greetingMessage}</Text>
          </View>
          {userData?.avatar === "" ? (
            <Image
              source={require("../../../assets/images/person.png")}
              style={styles.avatar}
            />
          ) : (
            <Image source={{ uri: userData?.avatar }} style={styles.avatar} />
          )}
        </View>

        {/* Counter */}
        <View style={styles.centerRows}>
          {/* Rows */}
          <SobrietyCounter text="You’ve been sober for" />

          <View style={{ marginTop: 25 }}>
            <Text style={[styles.progressText, { color: colors.textColor }]}>
              You Are Making Great Progress{" "}
              <Text
                style={[
                  styles.progressText,
                  { color: colors.primary, fontWeight: "600" },
                ]}
              >
                {userData?.userName}.
              </Text>
            </Text>

            {/* Progress Text */}
            <Text style={styles.subProgressText}>
              You can edit your goals and sobriety date incase of a relapse at
              any time by pressing the button below.
            </Text>

            {/* Clean btn */}
            <View style={{ marginHorizontal: 60, marginTop: 20 }}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>clean calculator</Text>
              </TouchableOpacity>
            </View>

            {/* Share Btns */}
            <ShareProgress bottomText={false} />
          </View>
        </View>

        {/* Find a meeting */}
        <View style={{ marginVertical: 15 }}>
          <HelpCards />
        </View>

        {/* Trending */}
        <View style={{ marginVertical: 15 }}>
          <TrendingNews />
        </View>
      </ScrollView>

      <BottomOptions />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#DAF2EF" },
  headerContainer: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  headerText1: {
    fontSize: 16 / fontScale,
    color: colors.textColor,
    fontWeight: "400",
    marginBottom: 15,
  },
  headerText2: {
    fontSize: 24 / fontScale,
    color: colors.textColor,
    fontWeight: "700",
  },
  avatar: { height: 75, width: 75, borderRadius: 360 },
  centerRows: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  progressText: {
    fontSize: 16 / fontScale,
    fontWeight: "400",
    textAlign: "center",
  },
  subProgressText: {
    color: "#7B979D",
    fontSize: 14 / fontScale,
    fontWeight: "400",
    marginTop: 5,
    textAlign: "center",
    maxWidth: "85%",
    lineHeight: 20,
  },
  btn: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 14 / fontScale,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
