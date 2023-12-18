import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-rotatedmarker";
import {
  calculateBearing,
  speedToDistanceInKm,
  moveAlongGreatCircle,
  getPopupContent,
  moveAlongCircularPath,
  distanceBetween2Points,
} from "../../utils";
import TrailComponent from "../TrailComponent";

const CustomMarker = ({ startingTime, origin, destination, marker, speed }) => {
  const map = useMap();
  const [customMarker, setCustomMarker] = useState(null);
  const [tail, setTail] = useState([]);

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
          icon: L.divIcon({
            className: "custom-icon",
            html: marker.icon,
          }),
        });
        newObjectMarker.addTo(map);
        attachClickEvent(
          newObjectMarker,
          speed,
          elapsedTime,
          newPosition,
          distanceTraveled,
          bearing
        );
        setCustomMarker(newObjectMarker);
      } else {
        attachClickEvent(
          customMarker,
          speed,
          elapsedTime,
          newPosition,
          distanceTraveled,
          bearing
        );
        customMarker.setLatLng(newPosition);
        customMarker.setRotationAngle(bearing);
      }

      objectOldPosition = newPosition;
      setTail((prevTail) => [
        ...prevTail,
        [newPosition.lat.toFixed(5), newPosition.lng.toFixed(5)],
      ]);
      
      // Check if the triangle has reached its destination
      if (distanceTraveled > markerTotalDistance) {
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

  function attachClickEvent(
    marker,
    speed,
    elapsedTime,
    newPosition,
    distanceTraveled,
    bearing
  ) {
    marker.on("click", () => {
      const updatedTail = tail.slice(-60); // Display the last 60 seconds of positions
      marker
        .bindPopup(
          getPopupContent(
            speed,
            elapsedTime,
            newPosition,
            distanceTraveled,
            bearing,
            updatedTail
          )
        )
        .openPopup();
    });
  }

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
