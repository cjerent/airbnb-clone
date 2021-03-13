import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import axios from "axios";

import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import RatingStars from "../components/RatingStars";
import RoomMap from "../components/RoomMap";
import { ScrollView } from "react-native-gesture-handler";

export default function RoomScreen() {
  const { params } = useRoute();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`
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
    <ScrollView style={styles.container}>
      <ImageBackground source={data.photos} style={styles.image}>
        <View style={styles.priceBox}>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <View style={styles.col1}>
          <Text numberOfLines={1} style={styles.title}>
            {data.title}
          </Text>
          <View style={styles.ratingContainer}>
            <RatingStars rating={data.ratingValue} />
            <Text style={styles.ratingText}>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={3} style={styles.description}>
          {data.description}
        </Text>
      </View>
      <RoomMap
        latitude={data.location[1]}
        longitude={data.location[0]}
        {...data}
      />
    </ScrollView>
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

  //IMAGE
  image: {
    height: 300,
    justifyContent: "flex-end",
  },
  priceBox: {
    backgroundColor: "black",
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  price: {
    color: "white",
    fontSize: 20,
  },

  //USER AVATAR
  avatar: {
    height: 80,
    width: 80,
    resizeMode: "contain",
    borderRadius: 50,
  },

  infoContainer: {
    marginTop: 10,
    flexDirection: "row",
    paddingBottom: 10,
    margin: 10,
  },
  title: {
    fontSize: 25,
  },

  col1: {
    flex: 1,
    padding: 10,
  },

  //RATING

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 15,
    marginLeft: 5,
    color: "#BBBB",
    fontWeight: "bold",
  },

  //DESCRIPTION

  descriptionContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
  },
});
