import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import GradientBg from "../../components/GradientBg";
import { colors } from "../../theme/theme";
import CustomBtn from "../../components/CustomBtn";
import { CustomInput, CustomPasswordInput } from "../../components/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../constants/context";
import Spinner from "react-native-loading-spinner-overlay";

const { fontScale } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const { SignIn, loading } = useUser();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView keyboardDismissMode="on-drag" style={styles.container}>
        <Spinner visible={loading} />

        {/* Header */}
        <View style={styles.subContainer}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ height: 100, width: 100 }}
          />

          <Text style={styles.headerText}>Welcome Back</Text>

          <Text style={styles.subtitle}>
            Login with your account information below, if you are struggling to
            login please{" "}
            <Text style={{ color: colors.primary }}>reset your password</Text>
          </Text>
        </View>

        {/* Text Inputs */}
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setusername}
            Icon={Ionicons}
            iconName="person-outline"
          />

          <CustomPasswordInput
            placeholder="Password"
            value={password}
            setValue={setpassword}
          />

          <View style={{ marginTop: 25 }}>
            <CustomBtn
              text="Login"
              primary={true}
              onPress={() => SignIn(username, password)}
            />
          </View>
        </View>

        {/* Button */}
      </ScrollView>
      {!keyboardVisible && (
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Don’t have an account?</Text>
          <CustomBtn
            text="Create an account"
            primary={false}
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#DAF2EF" },
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
  inputContainer: { marginTop: 10, marginHorizontal: 20, marginTop: "10%" },
  bottomContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bottomText: {
    marginBottom: 20,
    fontSize: 16 / fontScale,
    fontWeight: "400",
    textAlign: "center",
    color: colors.lightText,
  },
});
