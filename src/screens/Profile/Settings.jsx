import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../theme/theme";
import HeaderLogo from "../../components/HeaderLogo";
import { useUser } from "../../constants/context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { fontScale } = Dimensions.get("window");

const Btn = ({ text, onPress, iconName }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={colors.primary}
      />
      <Text
        style={{
          marginLeft: 10,
          color: "#000",
          fontWeight: "400",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const Settings = () => {
  const { userData } = useUser();

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <HeaderLogo />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={colors.textColor} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Settings</Text>
      </View>

      {userData?.avatar === "" || userData?.avatar === null ? (
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../../assets/images/person.png")}
            style={styles.avatar}
          />
        </View>
      ) : (
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userData?.avatar }} style={styles.avatar} />
        </View>
      )}

      <View style={{ margin: 20 }}>
        <Btn
          text="Edit Profile"
          iconName="account-edit"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <Btn
          text="Change Password"
          iconName="lock-reset"
          onPress={() => navigation.navigate("ChangePassword")}
        />
      </View>
    </ScrollView>
  );
};

export default Settings;

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
  avatarContainer: {
    marginTop: 35,
    marginBottom: 25,
    height: 125,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: 120, height: 120, borderRadius: 360 },
  btnContainer: {
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
