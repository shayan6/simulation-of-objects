// SquareMarker.js
import React, { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { calculateBearing, speedToDistanceInKm, moveAlongGreatCircle } from '../../utils';

const SquareMarker = ({ startingTime, position, origin }) => {
  const map = useMap(); // Access the map instance
  const [squareIcon, setSquareIcon] = useState(null);
  const [squarePosition, setSquarePosition] = useState(origin);

  useEffect(() => {
    let squareOldPosition = origin;
    const destination = { lat: 40.7128, lng: -74.006 };
    const speedSQUARE = 10_000_000; // Math.floor(Math.random() * 20 + 60);

    const squareInterval = setInterval(() => {
      const elapsedTime = Date.now() - startingTime;

      const distanceTraveled = speedToDistanceInKm(speedSQUARE, elapsedTime);

      const newPosition = moveAlongGreatCircle(
        origin.lat,
        origin.lng,
        destination.lat,
        destination.lng,
        distanceTraveled
      );

      const bearing = calculateBearing(
        squareOldPosition.lat,
        squareOldPosition.lng,
        newPosition.lat,
        newPosition.lng
      );

      setSquarePosition(newPosition);

      // Assuming you have a custom icon for the square
      const squareIcon = L.divIcon({
        className: 'custom-icon',
        html: `<i class="fas fa-arrow-up fa-2x" style="transform: rotate(${bearing}deg);"></i>`,
      });

      setSquareIcon(squareIcon);
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(squareInterval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  if (!squareIcon) {
    // You can return a loading indicator or null here
    return null;
  }

  return <Marker position={squarePosition} icon={squareIcon} />;
};

export default SquareMarker;
