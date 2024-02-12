import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { colors } from "../theme/theme";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";

const { fontScale } = Dimensions.get("window");

const data = [
  {
    id: "1",
    text: "Cannabis Being Used Successfully In Rehabs",
    image: require("../../assets/images/trending1.png"),
  },
  {
    id: "2",
    text: "Cannabis Being Used Successfully In Rehabs",
    image: require("../../assets/images/trending2.png"),
  },
  {
    id: "3",
    text: "Cannabis Being Used Successfully In Rehabs",
    image: require("../../assets/images/trending1.png"),
  },
  {
    id: "4",
    text: "Cannabis Being Used Successfully In Rehabs",
    image: require("../../assets/images/trending2.png"),
  },
  {
    id: "5",
    text: "Cannabis Being Used Successfully In Rehabs",
    image: require("../../assets/images/trending1.png"),
  },
];

const TrendingNews = () => {
  const renderItem = ({ item, index }) => (
    <View
      style={{
        height: 300,
        width: 175,
        borderRadius: 18,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        backgroundColor: "rgba(49, 153, 121, 0.95)",
        marginHorizontal: 10,
        marginLeft: index === 0 ? 20 : 10,
        marginTop: 20,
      }}
    >
      <Image
        source={item?.image}
        style={{ height: 120, width: 120, borderRadius: 360, marginBottom: 20 }}
      />

      <Text
        style={{
          fontSize: 15 / fontScale,
          fontWeight: "500",
          color: "#fff",
          lineHeight: 18,
          textAlign: "center",
        }}
      >
        {item?.text}
      </Text>

      <TouchableOpacity
        style={{
          height: 35,
          width: 35,
          borderRadius: 360,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#48D2A9",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24 / fontScale,
            color: colors.textColor,
            fontWeight: "700",
          }}
        >
          Trending News
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-right"
            size={25}
            color="rgba(64,180,144, 0.4)"
            style={{ marginRight: -15 }}
          />
          <MaterialIcons
            name="keyboard-arrow-right"
            size={25}
            color="#40B490"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TrendingNews;

const styles = StyleSheet.create({});
