import React from "react";
import { StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";

const RoomMap = ({ latitude, longitude, title, description, _id }) => {
  const markers = [
    {
      id: _id,
      latitude: latitude,
      longitude: longitude,
      title: title,
      description: description,
    },
  ];
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
    >
      {markers.map((marker) => {
        return (
          <MapView.Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        );
      })}
    </MapView>
  );
};

export default RoomMap;

const styles = StyleSheet.create({
  map: {
    height: 400,
  },
});
