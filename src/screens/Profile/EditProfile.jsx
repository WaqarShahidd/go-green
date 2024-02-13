import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../theme/theme";
import HeaderLogo from "../../components/HeaderLogo";
import { CustomInput, CustomPasswordInput } from "../../components/CustomInput";
import DatePickerBtn from "../../components/DatePickerBtn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "../../constants/context";
import CustomBtn from "../../components/CustomBtn";
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_APP, db } from "../../../FirebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

const { fontScale } = Dimensions.get("window");

const EditProfile = () => {
  const { userData, GetUser } = useUser();

  const navigation = useNavigation();

  const [username, setusername] = useState(userData?.userName);
  const [email, setemail] = useState(userData?.email);
  const [sobrietyDate, setsobrietyDate] = useState(userData?.sobrietyDate);
  const [image, setImage] = useState(userData?.avatar);

  const [loading, setloading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (img) => {
    setloading(true);
    const response = await fetch(img);
    const blob = await response.blob();

    const storage = getStorage(FIREBASE_APP);

    const storageRef = ref(storage, "images/" + new Date().getTime());

    try {
      await uploadBytesResumable(storageRef, blob);
      setloading(false);
      const downloadURL = await getDownloadURL(storageRef);
      setImage(downloadURL);
      console.log("Image uploaded. Download URL:", downloadURL);
    } catch (error) {
      console.error("Error uploading file: ", error);
      setloading(false);
    }
  };

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
          userName: username.toLowerCase(),
          email: email,
          avatar: image,
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Spinner visible={loading} />
      <ScrollView
        keyboardDismissMode="interactive"
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <HeaderLogo />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color={colors.textColor} />
          </TouchableOpacity>
          <Text style={styles.titleText}>Edit Profile</Text>
        </View>

        <>
          {image ? (
            <View style={styles.avatarContainer}>
              <Image source={{ uri: image }} style={styles.avatar} />
            </View>
          ) : (
            <View style={styles.avatarContainer}>
              <Image
                source={require("../../../assets/images/person.png")}
                style={styles.avatar}
              />
            </View>
          )}
          <TouchableOpacity style={styles.btn} onPress={pickImage}>
            <Text style={styles.btnText}>Choose an avatar</Text>
          </TouchableOpacity>
        </>

        <View style={styles.inputContainer}>
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
          <DatePickerBtn
            value={sobrietyDate}
            setValue={setsobrietyDate}
            text="Choose Sobriety Date"
          />
        </View>
        <View style={{ margin: 20 }}>
          <CustomBtn text="update" primary={true} onPress={UpdateUser} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

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
  inputContainer: { marginTop: 10, marginHorizontal: 20, marginTop: "10%" },
  titleText: {
    fontSize: 24 / fontScale,
    color: colors.textColor,
    fontWeight: "700",
  },
  avatarContainer: {
    marginVertical: 20,
    height: 102.5,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: 100, height: 100, borderRadius: 360 },
  uploadButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "60%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#EEFBF7",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 75,
  },
  btnText: {
    color: colors.textColor,
    fontSize: 14 / fontScale,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
