import React from "react";
import { View } from "@gluestack-ui/themed";
import MapView from "react-native-maps";

export interface LatLng {
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  location: LatLng;
}

const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
  return (
    <View flex={1}>
      <MapView
        style={{ flex: 1 /* width: "100%", height: "50vh" */ }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default MapComponent;
