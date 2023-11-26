import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { calculateBearing, speedToDistanceInKm, moveAlongGreatCircle } from '../../utils';

const TriangleMarker = ({ startingTime, origin, destination }) => {
  const map = useMap(); // Access the map instance
  const [squareMarker, setSquareMarker] = useState(null);

  useEffect(() => {
    let squareOldPosition = origin;
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

      if (!squareMarker) {
        // Create marker if it doesn't exist
        const newSquareMarker = L.marker(newPosition, {
          icon: L.divIcon({
            className: 'custom-icon',
            html: `<i class="fas fa-arrow-up fa-2x"></i>`,
          }),
        });

        setSquareMarker(newSquareMarker);
        newSquareMarker.addTo(map);
      } else {
        // Update marker position and rotation angle
        squareMarker.setLatLng(newPosition);
        squareMarker.setRotationAngle(bearing);
      }

      squareOldPosition = newPosition;
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(squareInterval);
    };
  }, [squareMarker, map, origin, startingTime]); // eslint-disable-line react-hooks/exhaustive-deps

  return null; // No need to render anything here as the marker is updated dynamically.
};

export default TriangleMarker;
