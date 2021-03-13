import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const RatingStars = ({ rating }) => {
  const tab = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      tab.push(<MaterialIcons name="star" size={24} color="gold" />);
    } else {
      tab.push(<MaterialIcons name="star" size={24} color="#BBBBBB" />);
    }
  }

  return <View style={styles.container}>{tab}</View>;
};
export default RatingStars;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
