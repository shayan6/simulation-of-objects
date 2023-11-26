// CircleMarker.js
import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const CircleMarker = ({ position }) => {
  const circleIcon = L.divIcon({
    className: 'custom-icon',
    html: '<i class="fas fa-circle fa-2x"></i>',
  });

  return <Marker position={position} icon={circleIcon} />;
};

export default CircleMarker;
