// Example in a Leaflet map component
import { MapContainer, TileLayer } from 'react-leaflet';

const Map = () => {
  const handleClick = (event) => {
    // Handle the click event
    console.log('Map clicked:', event.latlng);
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} onClick={handleClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Other map-related components */}
    </MapContainer>
  );
};

export default Map;
