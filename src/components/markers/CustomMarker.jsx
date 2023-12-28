import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import {
  calculateBearing,
  speedToDistanceInKm,
  moveAlongGreatCircle,
  moveAlongCircularPath,
  distanceBetween2Points,
} from "../../utils";
import TrailComponent from "./TrailComponent";
import "leaflet-rotatedmarker";

const CustomMarker = ({ startingTime, marker, speed }) => {
  const map = useMap();
  const [customMarker, setCustomMarker] = useState(null);
  const [tail, setTail] = useState([]);
  const origin = { lat: marker.originLatitude, lng: marker.originLongitude };
  const destination = { lat: marker.destinationLatitude, lng: marker.destinationLongitude };

  useEffect(() => {
    let objectOldPosition = origin;
    const markerInterval = setInterval(() => {
      const elapsedTime = Date.now() - startingTime;

      const distanceTraveled = speedToDistanceInKm(speed, elapsedTime);
      const markerTotalDistance = distanceBetween2Points(
        origin.lat,
        origin.lng,
        destination.lat,
        destination.lng
      );

      const newPosition =
        marker.movement === "greatCircle"
          ? moveAlongGreatCircle(
              origin.lat,
              origin.lng,
              destination.lat,
              destination.lng,
              distanceTraveled
            )
          : moveAlongCircularPath(
              origin.lat,
              origin.lng,
              destination.lat,
              destination.lng,
              distanceTraveled
            );

      const bearing = calculateBearing(
        objectOldPosition.lat,
        objectOldPosition.lng,
        newPosition.lat,
        newPosition.lng
      );

      if (!customMarker) {
        // Create marker if it doesn't exist
        const newObjectMarker = L.marker(newPosition, {                
          rotationAngle: -130,
          icon: L.divIcon({
            className: "custom-icon",
            html: marker.icon,
          }),
        });
        newObjectMarker.addTo(map);
        setCustomMarker(newObjectMarker);
      } else {
        customMarker.setLatLng(newPosition);
        // customMarker.setRotationAngle(bearing);
        const currentTransform = customMarker.getElement().style.transform || '';
        // Apply rotation using CSS transform, concatenate with existing transform
        customMarker.getElement().style.transform = `${currentTransform} rotate(${bearing - 80}deg)`;
      }

      objectOldPosition = newPosition;
      setTail((prevTail) => [
        ...prevTail,
        [newPosition.lat.toFixed(5), newPosition.lng.toFixed(5)],
      ]);
      
      // Check if the triangle has reached its destination
      if (marker.movement === "greatCircle" && distanceTraveled > markerTotalDistance) {
        if (marker.removeOnArival && customMarker) {
          customMarker.removeFrom(map);
        }
        clearInterval(markerInterval);
      }
    }, 100);
    
    // Cleanup function
    return () => {
      clearInterval(markerInterval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customMarker, map, origin, startingTime]);

  return (
    <TrailComponent
      tail={tail}
      setTail={setTail}
      origin={origin}
      destination={destination}
      color={marker.color}
    />
  );
};

export default CustomMarker;
