import axios from "axios";

const MAPBOX_TOKEN = "pk.eyJ1IjoiY29td29ya3M5NjI5IiwiYSI6ImNtZXM3bjJ6YjA1b28ybHF6eHY4M2w4eHgifQ.Ca_DRj5gMlkMgCW1GhDgeg";

export const geocodeSearch = async (query) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
  const res = await axios.get(url, { params: { access_token: MAPBOX_TOKEN, limit: 5 } });
  return res.data;
};

export const fetchRoute = async (origin, destination, profile = "driving") => {
  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${origin.join(",")};${destination.join(",")}`;
  const res = await axios.get(url, {
    params: { access_token: MAPBOX_TOKEN, geometries: "geojson", steps: true },
  });
  return res.data.routes[0];
};
