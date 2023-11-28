import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-rotatedmarker";
import {
  calculateBearing,
  speedToDistanceInKm,
  moveAlongGreatCircle,
  distanceBetween2Points,
  getPopupContent,
} from "../../utils";

const TriangleMarker = ({ startingTime, origin, destination }) => {
  const map = useMap(); // Access the map instance
  const [triangleMarker, setTriangleMarker] = useState(null);
  const [tail, setTail] = useState([]);

  useEffect(() => {
    let triangleOldPosition = origin;
    const speedTRIANGLE = Math.floor(Math.random() * 500 + 1700); // Random speed between 1700 and 2200 km/h

    const triangleInterval = setInterval(() => {
      const elapsedTime = Date.now() - startingTime;

      const distanceTraveled = speedToDistanceInKm(speedTRIANGLE, elapsedTime);
      const triangleTotalDistance = distanceBetween2Points(
        origin.lat,
        origin.lng,
        destination.lat,
        destination.lng
      );

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
            className: "custom-icon",
            html: `<i class="fas fa-play fa-2x" style="color: #dc1d65;"></i>`, // You can change the icon to represent a triangle
          }),
        });

        setTriangleMarker(newTriangleMarker);

        // Attach a click event listener to the marker
        newTriangleMarker.on("click", () => {
          const updatedTail = tail.slice(-60); // Display the last 60 seconds of positions
          newTriangleMarker
            .bindPopup(
              getPopupContent(
                speedTRIANGLE,
                elapsedTime,
                newPosition,
                distanceTraveled,
                bearing,
                updatedTail
              )
            )
            .openPopup();
        });

        newTriangleMarker.addTo(map);
      } else {
        // Attach a click event listener to the marker
        triangleMarker.on("click", () => {
          const updatedTail = tail.slice(-60); // Display the last 60 seconds of positions
          triangleMarker
            .bindPopup(
              getPopupContent(
                speedTRIANGLE,
                elapsedTime,
                newPosition,
                distanceTraveled,
                bearing,
                updatedTail
              )
            )
            .openPopup();
        });

        // Update marker position and rotation angle
        triangleMarker.setLatLng(newPosition);
        triangleMarker.setRotationAngle(bearing);
      }

      triangleOldPosition = newPosition;
      setTail((prevTail) => [
        ...prevTail,
        `[${newPosition.lat.toFixed(5)}, ${newPosition.lng.toFixed(5)}]`,
      ]);

      // Check if the triangle has reached its destination
      if (distanceTraveled > triangleTotalDistance) {
        if (triangleMarker) {
          triangleMarker.removeFrom(map);
        }
        clearInterval(triangleInterval);
      }
    }, 1000); // Adjust the interval based on your requirements

    // Cleanup function
    return () => {
      clearInterval(triangleInterval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triangleMarker, map, origin, startingTime, destination]);

  return null; // No need to render anything here as the marker is updated dynamically.
};

export default TriangleMarker;
