import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import axios from "axios";

export default function AroundMe() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestPermissionsAsync();
      let response;
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around?=${location.coords.latitude}&longitude=${location.coords.longitude}`
        );
      } else {
        response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );
      }
      const tab = [];
      for (let i = 0; i < response.data.length; i++) {
        tab.push({
          latitude: response.data[i].location[1],
          longitude: response.data[i].location[0],
          title: response.data[i].title,
        });
      }
      setCoords(tab);
      setIsLoading(false);
    };
    askPermission();
  }, []);

  return isLoading ? (
    <View style={styles.ActivityIndicator}>
      <ActivityIndicator size="large" color="#FF5B61" />
    </View>
  ) : (
    <MapView
      showsUserLocation={true}
      initialRegion={{
        latitude: latitude || 48.856614,
        longitude: longitude || 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      style={styles.map}
    >
      {coords.map((coord, index) => {
        return (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: coord.latitude,
              longitude: coord.longitude,
              title: coord.title,
            }}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

48.83116, 2.23874;
