import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  FlatList,
  Image,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import RoomCards from "../components/RoomCards";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <View style={styles.ActivityIndicator}>
      <ActivityIndicator size="large" color="#FF5B61" />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => {
          return <RoomCards data={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ActivityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
  },
});
