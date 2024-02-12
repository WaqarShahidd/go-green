import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { colors } from "../theme/theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePickerBtn = ({ value, setValue, text }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateConfirm = (date) => {
    setValue(moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={showDatePicker}>
        <MaterialCommunityIcons
          name="calendar-range"
          size={24}
          color={colors.primary}
        />
        <Text
          style={{
            marginLeft: 10,
            color: value ? "#000" : "#2f2f2f",
            fontWeight: "400",
          }}
        >
          {value ? moment(value).format("MM/DD/YYYY") : text}
        </Text>
        <TouchableOpacity style={styles.btn}>
          <MaterialCommunityIcons
            name="arrow-down"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        headerTextIOS="Pick a Date"
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
        textColor="black"
        titleStyle={{ color: "black" }}
        confirmTextStyle={{ color: "blue" }}
        cancelTextStyle={{ color: "red" }}
      />
    </>
  );
};

export default DatePickerBtn;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginTop: 15,
  },
  btn: {
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
