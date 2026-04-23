import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import RecenterMap from "./RecenterMap";

function TrackingMap({ currentLocation, route }) {
  return (
    <MapContainer
      center={currentLocation}
      zoom={14}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={currentLocation} />
      <Polyline positions={route} />

      <RecenterMap location={currentLocation} />
    </MapContainer>
  );
}

export default TrackingMap;