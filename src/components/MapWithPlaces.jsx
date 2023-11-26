import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import SquareMarker from './markers/SquareMarker';
import CircleMarker from './markers/CircleMarker';
import TriangleMarker from './markers/TriangleMarker';

const MapWithPlaces = () => {
  const origin = { lat: 59.437, lng: 24.7536 }; // starting from Estonia
  const destination = { lat: 40.7128, lng: -74.006 }; // new york or any destiantion toward
  const startingTime = Date.now();

  return (
    <MapContainer
      center={[origin.lat, origin.lng]}
      zoom={2}
      style={{ border: '2px solid black', height: '80vh', width: '80vw' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      <SquareMarker startingTime ={startingTime} origin={origin} destination={destination}/>
      <CircleMarker  startingTime ={startingTime + 1000} origin={origin} destination={destination} />
      <TriangleMarker  startingTime ={startingTime + 3000} origin={origin} destination={destination} />
    </MapContainer>
  );
};

export default MapWithPlaces;
