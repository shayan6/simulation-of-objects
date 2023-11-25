// Example in a Leaflet map component
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

// Import the marker icon image (adjust the path accordingly)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Create a custom icon using the imported images
const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
});

const Map = () => {
  const handleClick = (event) => {
    // Handle the click event
    console.log('Map clicked:', event.latlng);
  };

  return (
    <MapContainer id="map-container" center={[51.505, -0.09]} zoom={13} onClick={handleClick}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* Other map-related components */}
    </MapContainer>
  );
};

export default Map;
