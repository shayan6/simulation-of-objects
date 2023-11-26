import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import SquareMarker from './markers/SquareMarker';
// import CircleMarker from './markers/CircleMarker';

const MapWithPlaces = () => {
  const origin = { lat: 59.437, lng: 24.7536 };
  const startingTime = Date.now();

  return (
    <div className="container">
      <MapContainer
        center={[59.437, 24.7536]}
        zoom={1}
        style={{ border: '2px solid black', height: '80vh', width: '80vw' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        <SquareMarker startingTime ={startingTime} origin={origin} position={[origin.lat, origin.lng]} />
        {/* <CircleMarker position={[59.437, 24.7536]} /> */}
      </MapContainer>
    </div>
  );
};

export default MapWithPlaces;
