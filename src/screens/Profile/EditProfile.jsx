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
import { FIREBASE_APP } from "../../../FirebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const { fontScale } = Dimensions.get("window");

const EditProfile = () => {
  const { userData } = useUser();

  const [username, setusername] = useState(userData?.userName);
  const [email, setemail] = useState(userData?.email);
  const [sobrietyDate, setsobrietyDate] = useState(userData?.sobrietyDate);
  const [image, setImage] = useState(null);

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
        <HeaderLogo />

        <Text style={styles.titleText}>Edit Profile</Text>

        <>
          {image ? (
            <View style={styles.avatarContainer}>
              <View
                style={{
                  height: 102.5,
                  width: 102.5,
                  borderRadius: 360,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image source={{ uri: image }} style={styles.avatar} />
              </View>
            </View>
          ) : (
            <View style={styles.avatarContainer}>
              <View
                style={{
                  height: 102.5,
                  width: 102.5,
                  borderRadius: 360,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/images/person.png")}
                  style={styles.avatar}
                />
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={{ opacity: 0.8 }}>{"Choose an avatar"}</Text>
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
          <CustomBtn text="update" primary={true} />
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
  inputContainer: { marginTop: 10, marginHorizontal: 20, marginTop: "10%" },
  titleText: {
    fontSize: 24 / fontScale,
    color: colors.textColor,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 20,
  },
  avatarContainer: {
    marginVertical: 20,
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
});
