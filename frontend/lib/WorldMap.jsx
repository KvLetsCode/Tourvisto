import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const RecenterMap = ({ coordinates }) => {
  const map = useMap();
  if (coordinates?.length === 2) {
    map.setView(coordinates, 4); // zoom to country
  }
  return null;
};

const LeafletMap = ({ mapsData }) => {
  const coords = mapsData?.[0]?.coordinates;

  return (
    <MapContainer
      center={coords?.length === 2 ? coords : [0, 0]} // default world view
      zoom={coords?.length === 2 ? 4 : 2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {coords?.length === 2 && <Marker position={coords} />}
      {coords?.length === 2 && <RecenterMap coordinates={coords} />}
    </MapContainer>
  );
};

export default LeafletMap;
