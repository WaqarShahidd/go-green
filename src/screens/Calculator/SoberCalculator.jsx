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
import { useUser } from "../../constants/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import SobrietyCounter from "../../components/SobrietyCounter";

const { fontScale } = Dimensions.get("window");

const SoberCalculator = () => {
  const { userData, GetUser } = useUser();

  const navigation = useNavigation();

  const [sobrietyDate, setsobrietyDate] = useState(
    userData?.sobrietyDate || ""
  );
  const [sobrietyGoal, setsobrietyGoal] = useState(
    userData?.sobrietyGoal || ""
  );

  const [switchState, setSwitchState] = useState(false);

  const [life, setlife] = useState(false);

  const [loading, setloading] = useState(false);

  const UpdateUser = async () => {
    setloading(true);
    let userID = await AsyncStorage.getItem("userId");
    try {
      const usersCollection = collection(db, "Users");

      const q = query(usersCollection, where("id", "==", userID));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User with the specified id not found.");
        setloading(false);
        return;
      }

      const targetUserDoc = querySnapshot.docs[0].ref;

      const targetUserSnapshot = await getDoc(targetUserDoc);

      if (targetUserSnapshot.exists()) {
        const targetUserData = targetUserSnapshot.data();

        await updateDoc(targetUserDoc, {
          ...targetUserData,
          sobrietyDate: sobrietyDate,
          sobrietyGoal: sobrietyGoal,
        });

        GetUser();
        navigation.goBack();
        setloading(false);
        console.log("User information updated successfully.");
      } else {
        console.error("Target user document does not exist.");
        setloading(false);
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      setloading(false);
    }
  };

  const currentDate = moment();

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
              percentage={77}
              color={"#00AA6E"}
              delay={500 + 100 * 1}
              max={100}
            />
          ) : (
            <View style={{ marginTop: 10 }}>
              <SobrietyCounter text="Days Sober" />
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
            <CustomBtn text="Update" primary={true} onPress={UpdateUser} />
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
