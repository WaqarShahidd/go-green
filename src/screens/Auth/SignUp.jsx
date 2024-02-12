import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../theme/theme";
import { CustomInput, CustomPasswordInput } from "../../components/CustomInput";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomBtn from "../../components/CustomBtn";
import moment from "moment/moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import DatePickerBtn from "../../components/DatePickerBtn";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, db } from "../../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../../constants/context";
import Spinner from "react-native-loading-spinner-overlay";

const { fontScale } = Dimensions.get("window");

const SignUp = () => {
  const navigation = useNavigation();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [sobrietyDate, setsobrietyDate] = useState("");

  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const { SignIn } = useUser();

  const isUsernameUnique = async (username) => {
    console.log(username);
    const querySnapshot = await getDocs(
      query(
        collection(db, "Users"),
        where("userName", "==", username.toLowerCase())
      )
    );
    return querySnapshot.empty;
  };

  // Adds a User in Users Collection
  const OnSubmit = async (id) => {
    setloading(true);
    const userCollection = collection(db, "Users");

    addDoc(userCollection, {
      userName: username.toLowerCase(),
      email: email,
      password: password,
      id: id,
      avatar: "",
      sobrietyDate: moment(sobrietyDate).format("YYYY-MM-DD"),
      sobrietyGoal: "",
      createdAt: serverTimestamp(),
    })
      .then((docRef) => {
        setloading(false);
        SignIn(email, password);

        console.log("Document added with ID: ", docRef.id);
      })
      .catch((error) => {
        setloading(false);
        console.error("Error adding document: ", error);
      });
  };

  // Adds to Authentication
  const SignUp = async () => {
    const isUnique = await isUsernameUnique(username.toLowerCase());
    if (!isUnique) {
      setloading(false);
      setError("Username is already taken. Please choose a different one.");
      return;
    }
    if (
      email === "" ||
      password === "" ||
      username === "" ||
      sobrietyDate === ""
    ) {
      setError("Please fill all the fields");
    } else {
      setloading(true);
      setError("");
      try {
        const response = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        OnSubmit(response.user.uid);
        console.log(response);
        setloading(false);
      } catch (error) {
        setloading(false);
        console.log(error?.toString());
        if (
          error?.toString() ===
          "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setError("Password should be at least 6 characters");
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        keyboardDismissMode="interactive"
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Spinner visible={loading} />

        {/* Header */}
        <View style={styles.subContainer}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ height: 100, width: 100 }}
          />

          <Text style={styles.headerText}>Let’s Get You Back On Track</Text>

          <Text style={styles.subtitle}>
            Start tracking your sobriety with our app, register your information
            below.
          </Text>
        </View>

        {/* Text Inputs */}
        <View style={styles.inputContainer}>
          {error && (
            <Text
              style={{
                marginBottom: 25,
                color: "red",
              }}
            >
              {error}
            </Text>
          )}
          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setusername}
            Icon={Ionicons}
            iconName="person-outline"
          />
          <CustomInput
            placeholder="Email"
            value={email}
            setValue={setemail}
            Icon={MaterialCommunityIcons}
            iconName="email-outline"
            margin={true}
          />
          <CustomPasswordInput
            placeholder="Password"
            value={password}
            setValue={setpassword}
          />

          <DatePickerBtn
            value={sobrietyDate}
            setValue={setsobrietyDate}
            text="Choose Sobriety Date"
          />
        </View>
      </ScrollView>

      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <CustomBtn
          text="create my account"
          primary={true}
          // onPress={() => navigation.navigate("Home")}
          onPress={SignUp}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
    maxWidth: "60%",
    lineHeight: 40,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 14 / fontScale,
    color: colors.lightText,
    maxWidth: "90%",
    lineHeight: 25,
  },
  inputContainer: { marginTop: 10, marginHorizontal: 20, marginTop: "10%" },
});
