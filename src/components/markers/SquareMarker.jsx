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

const SquareMarker = ({ startingTime, origin, destination }) => {
  const map = useMap(); // Access the map instance
  const [squareMarker, setSquareMarker] = useState(null);
  const [tail, setTail] = useState([]);

  useEffect(() => {
    const minSpeed = 50;
    const maxSpeed = 80;
    // try to test it out on speedSQUARE = 100_000; to view moving around the world circle quick
    const speedSQUARE = Math.floor(
      Math.random() * (maxSpeed - minSpeed + 1) + minSpeed
    );

    let squareOldPosition = origin;

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
            className: "box-icon",
            html: `<div style="width: 20px; height: 20px; background-color: #6835b8; border-radius: 2px;"></div>`,
          }),
        });

        newSquareMarker.addTo(map);

        // Attach a click event listener to the marker
        newSquareMarker.on("click", () => {
          const updatedTail = tail.slice(-60); // Display the last 60 seconds of positions
          newSquareMarker
            .bindPopup(
              getPopupContent(
                speedSQUARE,
                elapsedTime,
                newPosition,
                distanceTraveled,
                bearing,
                updatedTail
              )
            )
            .openPopup();
        });

        setSquareMarker(newSquareMarker);
      } else {
        // Attach a click event listener to the marker
        squareMarker.on("click", () => {
          const updatedTail = tail.slice(-60); // Display the last 60 seconds of positions
          squareMarker
            .bindPopup(
              getPopupContent(
                speedSQUARE,
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
        squareMarker.setLatLng(newPosition);
        squareMarker.setRotationAngle(bearing);
      }

      squareOldPosition = newPosition;
      setTail((prevTail) => [
        ...prevTail,
        [newPosition.lat.toFixed(5), newPosition.lng.toFixed(5)],
      ]);
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(squareInterval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squareMarker, map, origin, startingTime]);

  return (
    <TrailComponent
      tail={tail}
      setTail={setTail}
      origin={origin}
      destination={destination}
      color={"#6835b880"}
    />
  ); // No need to render anything here as the marker is updated dynamically.
};

export default SquareMarker;
