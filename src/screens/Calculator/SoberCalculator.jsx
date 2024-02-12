import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../theme/theme";
import HeaderLogo from "../../components/HeaderLogo";
import BottomOptions from "../../components/BottomOptions";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import DatePickerBtn from "../../components/DatePickerBtn";
import CustomBtn from "../../components/CustomBtn";
import Donut from "../../components/Donut";
import { Switch } from "react-native-switch";
import ShareProgress from "../../components/ShareProgress";

const { fontScale } = Dimensions.get("window");

const SoberCalculator = () => {
  const [sobrietyDate, setsobrietyDate] = useState("");
  const [sobrietyGoal, setsobrietyGoal] = useState("");

  const [switchState, setSwitchState] = useState(false);

  const [life, setlife] = useState(false);

  const texts = ["12 Years", "6 Months", "23 Days", "15 Hours"];

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <HeaderLogo />

        {/* Switch */}
        <View style={styles.switchContainer}>
          <Switch
            value={switchState}
            onValueChange={(val) => setSwitchState(!switchState)}
            disabled={false}
            circleSize={25}
            backgroundActive={"#58C67C"}
            backgroundInactive={"#e4e4e4"}
            circleActiveColor={"#FFF"}
            circleInActiveColor={"#fff"}
            circleBorderWidth={0}
            changeValueImmediately={true}
            renderActiveText={false}
            renderInActiveText={false}
          />
        </View>

        {/* Counter */}
        <View style={styles.counterContainer}>
          {life ? (
            <Donut
              percentage={34}
              color={"#00AA6E"}
              delay={500 + 100 * 1}
              max={100}
            />
          ) : (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.sober}>Days Sober</Text>
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
            </View>
          )}
        </View>

        {/* Share */}
        <ShareProgress bottomText={true} />

        {/* Btn */}
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <DatePickerBtn
            value={sobrietyDate}
            setValue={setsobrietyDate}
            text="Choose Sobriety Date"
          />
          <DatePickerBtn
            value={sobrietyGoal}
            setValue={setsobrietyGoal}
            text="Choose Sobriety Goal"
          />
          <TouchableOpacity
            style={styles.pickerBtnContainer}
            onPress={() => setlife(!life)}
          >
            <Image
              source={require("../../../assets/images/quality-of-life.png")}
              style={{ height: 24, width: 24 }}
            />
            <Text style={styles.pickerBtnText}>I’m in This for Life</Text>
            <TouchableOpacity style={styles.pickerBtn}>
              <MaterialCommunityIcons
                name="arrow-down"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={{ marginTop: 15 }}>
            <CustomBtn text="Update" primary={true} />
          </View>
        </View>
      </ScrollView>

      <BottomOptions />
    </>
  );
};

export default SoberCalculator;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
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
  switchContainer: {
    marginHorizontal: 20,
    alignItems: "flex-end",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "center",
  },
  sober: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 20 / fontScale,
    textAlign: "center",
    marginBottom: 10,
  },
  pickerBtnContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginTop: 15,
  },
  pickerBtnText: {
    marginLeft: 10,
    color: "#2f2f2f",
    fontWeight: "400",
  },
  pickerBtn: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
