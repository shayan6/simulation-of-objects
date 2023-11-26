import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import { calculateBearing, speedToDistanceInKm, moveAlongCircularPath, distanceBetween2Points } from '../../utils';

const CircleMarker = ({ startingTime, origin, destination }) => {
  const map = useMap(); // Access the map instance
  const [circleMarker, setCircleMarker] = useState(null);
  useEffect(() => {
    let circleOldPosition = origin;
    const speedCIRCLE = 10_000_000; // Math.floor(Math.random() * 20 + 60);

    const circleInterval = setInterval(() => {
      const elapsedTime = Date.now() - startingTime;
      const distanceTraveled = speedToDistanceInKm(speedCIRCLE, elapsedTime);
      const circleRadiusKm = distanceBetween2Points(origin.lat, origin.lng, destination.lat, destination.lng);
      const circleTotalDistance = 2 * Math.PI * circleRadiusKm;

      if (distanceTraveled > circleTotalDistance) {
        if (circleMarker) {
          circleMarker.removeFrom(map);
        }
        clearInterval(circleInterval);
        return;
      }
      
      const newPosition = moveAlongCircularPath(
        origin.lat,
        origin.lng,
        destination.lat,
        destination.lng,
        distanceTraveled
      );

      const bearing = calculateBearing(
        circleOldPosition.lat,
        circleOldPosition.lng,
        newPosition.lat,
        newPosition.lng
      );

      if (!circleMarker) {
        // Create marker if it doesn't exist
        const newCircleMarker = L.marker(newPosition, {
          icon: L.divIcon({
            className: 'custom-icon',
            html: `<i class="fas fa-circle fa-2x"></i>`, // Use circle icon
          }),
        });

        setCircleMarker(newCircleMarker);
        newCircleMarker.addTo(map);
      } else {
        // Update marker position and rotation angle
        circleMarker.setLatLng(newPosition);
        circleMarker.setRotationAngle(bearing);
      }

      circleOldPosition = newPosition;
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(circleInterval);
    };
  }, [circleMarker, map, origin, startingTime]); // eslint-disable-line react-hooks/exhaustive-deps

  return null; // No need to render anything here as the marker is updated dynamically.
};

export default CircleMarker;
