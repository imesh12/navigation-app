import React from "react";
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setAccessToken("pk.eyJ1IjoiY29td29ya3M5NjI5IiwiYSI6ImNtZXM3bjJ6YjA1b28ybHF6eHY4M2w4eHgifQ.Ca_DRj5gMlkMgCW1GhDgeg");

export default function MapViewComponent({ children }) {
  return (
    <MapboxGL.MapView style={{ flex: 1 }}>
      <MapboxGL.Camera followUserLocation zoomLevel={14} />
      <MapboxGL.UserLocation visible={true} />
      {children}
    </MapboxGL.MapView>
  );
}
