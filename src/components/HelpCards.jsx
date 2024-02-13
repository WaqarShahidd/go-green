import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { fontScale } = Dimensions.get("window");

const data = [
  {
    id: "1",
    title: "Find A Meeting",
    description: "Find a local sobriety meeting near you.",
  },
  { id: "2", title: "Card 2", description: "Description for Card 2" },
  { id: "3", title: "Card 3", description: "Description for Card 3" },
  { id: "4", title: "Card 4", description: "Description for Card 4" },
  { id: "5", title: "Card 5", description: "Description for Card 5" },
];

const HelpCards = () => {
  const renderItem = ({ item, index }) => (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/hep.jpg")}
        style={styles.image}
      />
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <LinearGradient
            colors={["rgba(8, 170, 113, 0.75)", "rgba(106,191,165,1)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradient}
          >
            <View style={{ flex: 1 }}></View>
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item?.title}</Text>
              <Text style={styles.description}>{item?.description}</Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default HelpCards;

const styles = StyleSheet.create({
  container: {
    height: 200,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cardContainer: {
    marginHorizontal: 10,
    width: 300,
    height: 150,
    position: "relative",
  },
  image: {
    height: 135,
    width: 135,
    borderRadius: 360,
    position: "absolute",
    left: 20,
    zIndex: 1,
    top: 20,
  },
  card: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  description: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 12 / fontScale,
    marginTop: 10,
    lineHeight: 20,
  },
  gradient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
    fontSize: 17 / fontScale,
  },
});
