import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-rotatedmarker";
import {
  calculateBearing,
  speedToDistanceInKm,
  moveAlongGreatCircle,
  getPopupContent,
} from "../../utils";
import TrailComponent from "../TrailComponent";

const CustomMarker = ({ startingTime, origin, destination, color, speed, icon }) => {
  const map = useMap();
  const [customMarker, setCustomMarker] = useState(null);
  const [tail, setTail] = useState([]);

  useEffect(() => {
    let objectOldPosition = origin;
    const markerInterval = setInterval(() => {
      const elapsedTime = Date.now() - startingTime;

      const distanceTraveled = speedToDistanceInKm(speed, elapsedTime);

      const newPosition = moveAlongGreatCircle(
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
            html: icon,
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
      color={color}
    />
  );
};

export default CustomMarker;