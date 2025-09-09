import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapViewComponent from "../components/MapView";
import SearchBar from "../components/SearchBar";
import { fetchRoute } from "../services/mapboxService";
import MapboxGL from "@rnmapbox/maps";

export default function NavigationScreen() {
  const [route, setRoute] = useState(null);
  const [eta, setEta] = useState(null);

  const onDestinationSelect = async (destination) => {
    const origin = [139.6917, 35.6895]; // TODO: replace with user's current location
    const r = await fetchRoute(origin, destination);
    setRoute(r.geometry);
    setEta({ distance: (r.distance / 1000).toFixed(1), duration: (r.duration / 60).toFixed(0) });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapViewComponent>
        {route && (
          <MapboxGL.ShapeSource id="routeSource" shape={route}>
            <MapboxGL.LineLayer id="routeLine" style={{ lineColor: "blue", lineWidth: 4 }} />
          </MapboxGL.ShapeSource>
        )}
      </MapViewComponent>

      <SearchBar onSelect={onDestinationSelect} />

      {eta && (
        <View style={styles.infoBox}>
          <Text>Distance: {eta.distance} km</Text>
          <Text>ETA: {eta.duration} min</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    position: "absolute",
    bottom: 40,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
});
