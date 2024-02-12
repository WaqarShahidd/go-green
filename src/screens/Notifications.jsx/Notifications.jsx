import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import HeaderLogo from "../../components/HeaderLogo";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../theme/theme";
import BottomOptions from "../../components/BottomOptions";

const { fontScale } = Dimensions.get("window");

const notifications = [
  {
    id: "1",
    notificationTitle: "New Message",
    notificationText: "You have a new message from Alexander",
    createdBy: {
      avatar: "",
    },
  },
];

const Notifications = () => {
  return (
    <>
      <View style={styles.container}>
        <HeaderLogo />
        <View style={styles.subContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.heading}>Notifications</Text>
            </View>
          </View>

          {notifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Entypo name="emoji-sad" size={24} color={colors.primary} />
              <Text style={styles.emptyText}>No notifications</Text>
            </View>
          ) : (
            <FlatList
              data={notifications ? notifications : []}
              keyExtractor={(item) => item.id}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              style={{
                marginTop: 10,
              }}
              removeClippedSubviews={true}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              legacyImplementation={true}
              onEndReachedThreshold={0.5}
              contentContainerStyle={{
                paddingBottom: 120,
              }}
              renderItem={({ item, index }) => (
                <View style={[styles.notificationContainer]}>
                  <View style={styles.icon}>
                    <Image
                      source={require("../../../assets/images/person.png")}
                      style={{ height: 50, width: 50, borderRadius: 360 }}
                    />
                  </View>
                  <View>
                    <Text style={styles.title}>{item?.notificationTitle}</Text>
                    <Text style={styles.body}>{item?.notificationText}</Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
      <BottomOptions />
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 26 / fontScale,
    fontWeight: "600",
    color: colors.secondary,
  },

  readAllButton: {
    borderRadius: 18,
    backgroundColor: colors.textColor,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 140,
    marginHorizontal: 18,
    marginVertical: 10,
  },
  readAllText: { fontWeight: "600" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  emptyText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 18 / fontScale,
    marginLeft: 10,
  },
  notificationContainer: {
    // height: 65,
    flexDirection: "row",
    paddingVertical: 17.5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(141, 141, 141, 0.2)",
    alignItems: "center",
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  title: {
    color: "#000",
    fontSize: 16 / fontScale,
    fontWeight: "600",
    paddingBottom: 10,
    maxWidth: "90%",
  },
  body: {
    color: "#b2b2b2",
    fontSize: 14 / fontScale,
    fontWeight: "400",
    maxWidth: "90%",
  },
});
