import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../theme/theme";
import { FontAwesome5 } from "@expo/vector-icons";

const { fontScale } = Dimensions.get("window");

const ShareProgress = ({ bottomText }) => {
  return (
    <View style={styles.shareProgressContainer}>
      <Text style={styles.title}>Share My Progress</Text>

      <View style={styles.btns}>
        <TouchableOpacity>
          <FontAwesome5 name="twitter" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="instagram" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="facebook-f" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {bottomText && (
        <Text style={styles.bottomText}>Update Your Sobriety Date & Goals</Text>
      )}
    </View>
  );
};

export default ShareProgress;

const styles = StyleSheet.create({
  shareProgressContainer: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.textColor,
    fontSize: 16 / fontScale,
    fontWeight: "600",
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "35%",
  },
  bottomText: {
    fontSize: 22 * fontScale,
    fontWeight: "600",
    color: colors.secondary,
    marginTop: 20,
    maxWidth: "60%",
    textAlign: "center",
    lineHeight: 30,
  },
});
