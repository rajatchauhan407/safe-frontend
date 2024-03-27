import React from "react";
import { SafeAreaView } from "@gluestack-ui/themed";
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
    <SafeAreaView flex={1} borderRadius={20}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Workers Location"
          description="Someone needs help at this location"
          image={require("../../assets/icons/marker.png")}
        />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapComponent;
