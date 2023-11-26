import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapControls = ({ rotationAngle }) => {
  const map = useMap();

  useEffect(() => {
    // Apply CSS transformation to rotate the map
    const mapContainer = map.getContainer();
    mapContainer.style.transform = `rotate(${rotationAngle}deg)`;

    return () => {
      // Cleanup: reset the transformation when the component unmounts
      mapContainer.style.transform = 'rotate(0deg)';
    };
  }, [map, rotationAngle]);

  return null;
};

export default MapControls;
