import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../constants/context";

const { fontScale } = Dimensions.get("window");

const BottomOptions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuHeight = useState(new Animated.Value(0))[0];

  const screenHeight = Dimensions.get("window").height;
  const menuHeightValue = screenHeight * 0.75;

  const toggleMenu = () => {
    Animated.timing(menuHeight, {
      toValue: isMenuOpen ? 0 : menuHeightValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = useNavigation();

  const { setUserData, setisAuthenticated } = useUser();

  const LogoutActions = () => {
    FIREBASE_AUTH.signOut();
    AsyncStorage.removeItem("userId");
    setUserData({});
    setisAuthenticated(false);
  };

  return (
    <View style={styles.btm}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={toggleMenu}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(64,180,144,0.1)",
            padding: 10,
            paddingHorizontal: 15,
            borderRadius: 27,
          }}
        >
          <MaterialCommunityIcons
            name="view-dashboard-outline"
            size={24}
            color="#40B490"
          />
          <Text
            style={{ color: "#40B490", marginLeft: 7.5, fontWeight: "600" }}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.tabItem}>
          <FontAwesome5 name="heart" size={24} color={"rgba(64,180,144,0.4)"} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Setting")}
        >
          <AntDesign name="setting" size={24} color={"rgba(64,180,144,0.4)"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, { position: "relative" }]}
          onPress={() => navigation.navigate("Notifications")}
        >
          <View
            style={{
              height: 8,
              width: 8,
              backgroundColor: "#ff9090",
              position: "absolute",
              top: 2.5,
              right: 3,
              borderRadius: 360,
              zIndex: 99999999,
            }}
          />
          <Ionicons
            name="notifications-outline"
            size={24}
            color={"rgba(64,180,144,0.4)"}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <Animated.View style={[styles.menu, { height: menuHeight }]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate("Home");
              toggleMenu();
            }}
          >
            <Text style={styles.optionText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("AboutUs")}
          >
            <Text style={styles.optionText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.optionText}>Find A Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("SoberCalculator")}
          >
            <Text style={styles.optionText}>Sober Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Setting")}
          >
            <Text style={styles.optionText}>My Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              { flexDirection: "row", alignItems: "center" },
            ]}
            onPress={LogoutActions}
          >
            <AntDesign name="logout" size={24} color={colors.primary} />
            <Text style={[styles.optionText, { marginLeft: 10 }]}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default BottomOptions;

const styles = StyleSheet.create({
  btm: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 5,
    height: 90,
    paddingBottom: 10,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  tabItem: {
    padding: 0,
  },
  menu: {
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  menuItem: {
    padding: 20,
  },
  optionText: {
    color: "#2E5254",
    fontSize: 23 / fontScale,
    fontWeight: "700",
  },
});
