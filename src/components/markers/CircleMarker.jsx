import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-rotatedmarker";
import {
  calculateBearing,
  speedToDistanceInKm,
  moveAlongCircularPath,
  distanceBetween2Points,
  getPopupContent,
} from "../../utils";
import TrailComponent from "../TrailComponent";

const CircleMarker = ({ startingTime, origin, destination }) => {
  const map = useMap(); // Access the map instance
  const [circleMarker, setCircleMarker] = useState(null);
  const [tail, setTail] = useState([]);

  useEffect(() => {
    let circleOldPosition = origin;
    // use const speedCIRCLE = 10_000_000; // to view in full speed but comment the remove function
    const speedCIRCLE = Math.floor(Math.random() * (300 - 110 + 1) + 110);

    const circleInterval = setInterval(() => {
      const elapsedTime = Date.now() - startingTime;
      const distanceTraveled = speedToDistanceInKm(speedCIRCLE, elapsedTime);
      const circleRadiusKm = distanceBetween2Points(
        origin.lat,
        origin.lng,
        destination.lat,
        destination.lng
      );
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
            className: "custom-icon",
            html: `<i class="fas fa-circle fa-2x" style="color: #439ad3;"></i>`, // Use circle icon
          }),
        });

        setCircleMarker(newCircleMarker);

        // Attach a click event listener to the marker
        newCircleMarker.on("click", () => {
          const updatedTail = tail.slice(-60); // Display the last 60 seconds of positions
          newCircleMarker
            .bindPopup(
              getPopupContent(
                speedCIRCLE,
                elapsedTime,
                newPosition,
                distanceTraveled,
                bearing,
                updatedTail
              )
            )
            .openPopup();
        });

        newCircleMarker.addTo(map);
      } else {
        // Attach a click event listener to the marker
        circleMarker.on("click", () => {
          const updatedTail = tail.slice(-60); // Display the last 60 seconds of positions
          circleMarker
            .bindPopup(
              getPopupContent(
                speedCIRCLE,
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
        circleMarker.setLatLng(newPosition);
        circleMarker.setRotationAngle(bearing);
      }

      circleOldPosition = newPosition;
      setTail((prevTail) => [
        ...prevTail,
        [newPosition.lat.toFixed(5), newPosition.lng.toFixed(5)],
      ]);
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(circleInterval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circleMarker, map, origin, startingTime]);

  return (
    <TrailComponent
      tail={tail}
      setTail={setTail}
      origin={origin}
      destination={destination}
      color={"#439ad3"}
    />
  ); // No need to render anything here as the marker is updated dynamically.
};

export default CircleMarker;
