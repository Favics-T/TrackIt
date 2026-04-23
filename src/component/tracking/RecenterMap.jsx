import { useMap } from "react-leaflet";
import { useEffect } from "react";

function RecenterMap({ location }) {
  const map = useMap();

  useEffect(() => {
    map.setView(location);
  }, [location, map]);

  return null;
}

export default RecenterMap;