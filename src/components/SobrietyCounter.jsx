import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../theme/theme";
import { useUser } from "../constants/context";
import moment from "moment";

const { fontScale } = Dimensions.get("window");

const SobrietyCounter = ({ text }) => {
  const { userData } = useUser();

  const currentDate = moment();

  const diff = moment.duration(currentDate?.diff(userData?.sobrietyDate));

  return (
    <View>
      <Text style={styles.soberText}>{text}</Text>
      <View style={styles.row}>
        <Text style={styles.number}>
          {userData?.sobrietyDate === "" ? 0 : diff.years()}{" "}
          <Text style={styles.year}>Years</Text>
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.number}>
          {userData?.sobrietyDate === "" ? 0 : diff.months()}{" "}
          <Text style={styles.year}>Months</Text>
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.number}>
          {userData?.sobrietyDate === "" ? 0 : diff.days()}{" "}
          <Text style={styles.year}>Days</Text>
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.number}>
          {userData?.sobrietyDate === "" ? 0 : diff.hours()}{" "}
          <Text style={styles.year}>Hours</Text>
        </Text>
      </View>
    </View>
  );
};

export default SobrietyCounter;

const styles = StyleSheet.create({
  soberText: {
    color: colors.primary,
    fontSize: 20 / fontScale,
    fontWeight: "700",
  },
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
});
