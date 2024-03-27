import React from "react";
import { View } from "@gluestack-ui/themed";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

export interface LatLng {
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  location: LatLng;
}

const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
  return (
    <View flex={1} borderRadius={20}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01, // Adjust to zoom in or out
          longitudeDelta: 0.01, // Adjust to zoom in or out
        }}
      >
        {/* Marker to show the specified location */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Location"
          description="This is the specified location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapComponent;
