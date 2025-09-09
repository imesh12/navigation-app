import Geolocation from "@react-native-community/geolocation";

export const watchUserLocation = (callback) => {
  const watchId = Geolocation.watchPosition(
    (pos) => callback(pos.coords),
    (err) => console.error(err),
    { enableHighAccuracy: true, distanceFilter: 1, interval: 1000 }
  );
  return () => Geolocation.clearWatch(watchId);
};
