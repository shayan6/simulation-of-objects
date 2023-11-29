import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapRotation = ({
  zoom,
  rotationAngle,
  originLatitude,
  originLongitude,
  destinationLatitude,
  destinationLongitude,
}) => {
  const map = useMap();

  useEffect(() => {
    // Apply CSS transformation to rotate the map
    const mapContainer = map.getContainer();
    mapContainer.style.transform = `rotate(${rotationAngle}deg)`;

    return () => {
      // Cleanup: reset the transformation when the component unmounts
      mapContainer.style.transform = "rotate(0deg)";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, rotationAngle]);

  useEffect(() => {
    map.setView([originLatitude, originLongitude], zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    originLatitude,
    originLongitude,
    destinationLatitude,
    destinationLongitude,
  ]);

  return null;
};

export default MapRotation;
