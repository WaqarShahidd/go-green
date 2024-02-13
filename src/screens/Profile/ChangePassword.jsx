import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../theme/theme";
import HeaderLogo from "../../components/HeaderLogo";
import { Ionicons } from "@expo/vector-icons";
import CustomBtn from "../../components/CustomBtn";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../../FirebaseConfig";
import { CustomPasswordInput } from "../../components/CustomInput";
import { useUser } from "../../constants/context";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

const { fontScale } = Dimensions.get("window");

const ChangePassword = () => {
  const { userData } = useUser();
  const navigation = useNavigation();

  const [currentPass, setcurrentPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChangePassword = () => {
    const user = FIREBASE_AUTH.currentUser;

    setError("");
    setSuccessMessage("");
    setloading(true);
    if (newPass !== confirmPass) {
      setError("New password and confirm password do not match.");
      setloading(false);
      return;
    } else if (currentPass === "" || newPass === "" || confirmPass === "") {
      setError("Please fill all fields.");
      setloading(false);
      return;
    } else if (currentPass === newPass) {
      setError("New password cannot be the same as the current password.");
      setloading(false);
      return;
    } else if (
      currentPass.length < 6 ||
      newPass.length < 6 ||
      confirmPass.length < 6
    ) {
      setError("Password must be at least 6 characters.");
      setloading(false);
      return;
    } else {
      console.log(user?.email, currentPass);
      const credential = EmailAuthProvider.credential(user.email, currentPass);
      console.log(credential);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPass)
            .then(() => {
              setSuccessMessage("Password updated successfully.");
              setconfirmPass("");
              setnewPass("");
              setcurrentPass("");
              setloading(false);
            })
            .catch((error) => {
              setError(error.message);
              console.log(error);
              setloading(false);
            });
        })
        .catch((error) => {
          setError(
            "Re-authentication failed. Please check your current password."
          );
          console.error("Error re-authenticating user:", error);
          setloading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <HeaderLogo />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={colors.textColor} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Change Password</Text>
      </View>

      <View style={styles.formContainer}>
        {error && (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        )}
        {successMessage && (
          <Text style={{ color: "green", textAlign: "center" }}>
            {successMessage}
          </Text>
        )}
        <CustomPasswordInput
          placeholder="Current Password"
          value={currentPass}
          setValue={setcurrentPass}
        />
        <CustomPasswordInput
          placeholder="New Password"
          value={newPass}
          setValue={setnewPass}
        />
        <CustomPasswordInput
          placeholder="Confirm Password"
          value={confirmPass}
          setValue={setconfirmPass}
        />
      </View>

      <View style={{ margin: 20, flex: 1, justifyContent: "flex-end" }}>
        <CustomBtn
          text="Update"
          primary={true}
          onPress={handleChangePassword}
        />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleText: {
    fontSize: 24 / fontScale,
    color: colors.textColor,
    fontWeight: "700",
  },
  formContainer: {
    margin: 20,
  },
});
