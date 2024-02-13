import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../theme/theme";
import { CustomInput } from "../../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomBtn from "../../components/CustomBtn";

const { fontScale } = Dimensions.get("window");

const ResetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);

  const [error, seterror] = useState("");

  const handleResetPassword = async () => {
    seterror("");
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    } else {
      setloading(true);
      try {
        await sendPasswordResetEmail(FIREBASE_AUTH, email);

        Alert.alert(
          "Password Reset Email Sent",
          "Check your email for further instructions."
        );
        navigation.goBack();
        setloading(false);
      } catch (error) {
        seterror(error);

        console.log("Error sending password reset email: ", error);
        Alert.alert(
          "Error",
          "Failed to send password reset email. Please try again."
        );
        setloading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.subContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ height: 100, width: 100 }}
        />

        <Text style={styles.headerText}>Reset Password</Text>

        <Text style={styles.subtitle}>
          Enter your email to reset your password.{" "}
        </Text>
      </View>

      <View style={{ margin: 20 }}>
        {error && (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        )}
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          Icon={MaterialCommunityIcons}
          iconName="email-outline"
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", margin: 20 }}>
        <CustomBtn
          text="Reset Password"
          primary={false}
          onPress={handleResetPassword}
        />
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  subContainer: {
    marginTop: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28 / fontScale,
    color: colors.secondary,
    fontWeight: "700",
    marginTop: 25,
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 14 / fontScale,
    color: colors.lightText,
    maxWidth: "90%",
  },
});
