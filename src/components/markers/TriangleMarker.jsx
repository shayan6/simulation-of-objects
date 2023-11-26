import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { calculateBearing, speedToDistanceInKm, moveAlongGreatCircle } from '../../utils';

const TriangleMarker = ({ startingTime, origin, destination }) => {
  const map = useMap(); // Access the map instance
  const [triangleMarker, setTriangleMarker] = useState(null);

  useEffect(() => {
    let triangleOldPosition = origin;
    const speedTRIANGLE = Math.floor(Math.random() * 500 + 1700); // Random speed between 1700 and 2200 km/h

    const triangleInterval = setInterval(() => {
      const elapsedTime = Date.now() - startingTime;

      const distanceTraveled = speedToDistanceInKm(speedTRIANGLE, elapsedTime);

      const newPosition = moveAlongGreatCircle(
        origin.lat,
        origin.lng,
        destination.lat,
        destination.lng,
        distanceTraveled
      );

      const bearing = calculateBearing(
        triangleOldPosition.lat,
        triangleOldPosition.lng,
        newPosition.lat,
        newPosition.lng
      );

      if (!triangleMarker) {
        // Create marker if it doesn't exist
        const newTriangleMarker = L.marker(newPosition, {
          icon: L.divIcon({
            className: 'custom-icon',
            html: `<i class="fas fa-play fa-2x"></i>`, // You can change the icon to represent a triangle
          }),
        });

        setTriangleMarker(newTriangleMarker);
        newTriangleMarker.addTo(map);
      } else {
        // Update marker position and rotation angle
        triangleMarker.setLatLng(newPosition);
        triangleMarker.setRotationAngle(bearing);
      }

      triangleOldPosition = newPosition;

      // Check if the triangle has reached its destination
      if (distanceTraveled >= moveAlongGreatCircle(origin.lat, origin.lng, destination.lat, destination.lng, 0)) {
        clearInterval(triangleInterval);
      }
    }, 1000); // Adjust the interval based on your requirements

    // Cleanup function
    return () => {
      clearInterval(triangleInterval);
    };
  }, [triangleMarker, map, origin, startingTime, destination]); // eslint-disable-line react-hooks/exhaustive-deps

  return null; // No need to render anything here as the marker is updated dynamically.
};

export default TriangleMarker;
