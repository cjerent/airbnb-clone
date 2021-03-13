import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RatingStars from "../components/RatingStars";

const RoomCards = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Room", { roomId: data._id })}
    >
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: data.photos[0].url }}
          style={styles.image}
        >
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
      </View>
    </TouchableOpacity>
  );
};

export default RoomCards;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },

  //IMAGE

  image: {
    height: 200,
    resizeMode: "contain",
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
    borderBottomWidth: 2,
    borderBottomColor: "#CCCC",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
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
});
