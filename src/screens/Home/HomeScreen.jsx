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
import React, { useRef, useState } from "react";
import HeaderLogo from "../../components/HeaderLogo";
import { colors } from "../../theme/theme";
import CustomBtn from "../../components/CustomBtn";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import BottomOptions from "../../components/BottomOptions";
import HelpCards from "../../components/HelpCards";
import TrendingNews from "../../components/TrendingNews";

const { fontScale } = Dimensions.get("window");

const HomeScreen = () => {
  const [isVisible, setisVisible] = useState(false);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <HeaderLogo />

        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text style={styles.headerText1}>Hi, Alex Kane</Text>
            <Text style={styles.headerText2}>Good Morning</Text>
          </View>
          <Image
            source={require("../../../assets/images/person.png")}
            style={styles.avatar}
          />
        </View>

        <View style={styles.centerRows}>
          <Text style={styles.soberText}>You’ve been sober for</Text>

          {/* Rows */}
          <View style={styles.row}>
            <Text style={styles.number}>
              12 <Text style={styles.year}>Years</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>
              10 <Text style={styles.year}>Months</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>
              23 <Text style={styles.year}>Days</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>
              16 <Text style={styles.year}>Hours</Text>
            </Text>
          </View>

          {/*  */}
          <View style={{ marginTop: 25 }}>
            <Text style={[styles.progressText, { color: colors.textColor }]}>
              You Are Making Great Progress{" "}
              <Text
                style={[
                  styles.progressText,
                  { color: colors.primary, fontWeight: "600" },
                ]}
              >
                Alex.
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

            {/* Btns */}
            <View
              style={{
                marginVertical: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.textColor,
                  fontSize: 16 / fontScale,
                  fontWeight: "600",
                }}
              >
                Share My Progress
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                  width: "35%",
                }}
              >
                <TouchableOpacity>
                  <FontAwesome5
                    name="twitter"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5
                    name="instagram"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5
                    name="facebook-f"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
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
  row: {
    paddingVertical: 12,
    marginVertical: 0,
    borderBottomWidth: 1,
    width: 200,
    paddingLeft: 70,
    justifyContent: "center",
  },
  number: {
    color: "#000",
    fontSize: 20 / fontScale,
    fontWeight: "600",
  },
  year: {
    color: colors.primary,
    fontSize: 16 / fontScale,
    fontWeight: "500",
  },
  centerRows: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  soberText: {
    color: colors.primary,
    fontSize: 20 / fontScale,
    fontWeight: "700",
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
