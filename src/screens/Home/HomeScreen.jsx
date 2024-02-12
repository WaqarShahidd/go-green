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
import moment from "moment";

const { fontScale } = Dimensions.get("window");

const HomeScreen = () => {
  const [isVisible, setisVisible] = useState(false);

  const { userData, GetUser } = useUser();

  useEffect(() => {
    GetUser();
  }, []);

  const currentDate = moment();

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
            <Text style={styles.headerText2}>Good Morning</Text>
          </View>
          <Image
            source={require("../../../assets/images/person.png")}
            style={styles.avatar}
          />
        </View>

        {/* Counter */}
        <View style={styles.centerRows}>
          <Text style={styles.soberText}>You’ve been sober for</Text>

          {/* Rows */}
          <Text>{userData?.sobrietyDate}</Text>
          <View style={styles.row}>
            <Text style={styles.number}>
              {currentDate.diff(userData?.sobrietyDate, "years")}{" "}
              <Text style={styles.year}>Years</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>
              {currentDate.diff(userData?.sobrietyDate, "months") % 12}{" "}
              <Text style={styles.year}>Months</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>
              {currentDate.diff(userData?.sobrietyDate, "days") % 30}{" "}
              <Text style={styles.year}>Days</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.number}>
              {currentDate.diff(userData?.sobrietyDate, "hours") % 24}{" "}
              <Text style={styles.year}>Hours</Text>
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
