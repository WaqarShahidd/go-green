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
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePickerBtn from "../../components/DatePickerBtn";
import CustomBtn from "../../components/CustomBtn";
import Donut from "../../components/Donut";
import { Switch } from "react-native-switch";

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

        <View
          style={{
            marginHorizontal: 20,
            alignItems: "flex-end",
          }}
        >
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {life ? (
            <Donut
              percentage={34}
              color={"#00AA6E"}
              delay={500 + 100 * 1}
              max={100}
            />
          ) : (
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "600",
                  fontSize: 20 / fontScale,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                Days Sober
              </Text>
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
              <FontAwesome5 name="twitter" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5 name="instagram" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5
                name="facebook-f"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 22 * fontScale,
              fontWeight: "600",
              color: colors.secondary,
              marginTop: 20,
              maxWidth: "60%",
              textAlign: "center",
              lineHeight: 30,
            }}
          >
            Update Your Sobriety Date & Goals
          </Text>
        </View>

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
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              height: 60,
              borderRadius: 50,
              paddingHorizontal: 20,
              backgroundColor: "white",
              marginTop: 15,
            }}
            onPress={() => setlife(!life)}
          >
            <Image
              source={require("../../../assets/images/quality-of-life.png")}
              style={{ height: 24, width: 24 }}
            />
            <Text
              style={{
                marginLeft: 10,
                color: "#2f2f2f",
                fontWeight: "400",
              }}
            >
              I’m in This for Life
            </Text>
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: colors.primary,
                marginLeft: "auto",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
});
