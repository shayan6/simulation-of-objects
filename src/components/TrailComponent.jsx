import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const TrailComponent = ({ tail, setTail, origin, destination, color }) => {
  const map = useMap(); // Access the map instance

  useEffect(() => {
    setTail([[origin.lat, origin.lng]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  useEffect(() => {
    if (!map || !tail || tail.length < 2) {
      return;
    }

    const trailLine = L.polyline(tail, { color }).addTo(map);
    trailLine.setStyle({ opacity: 0.4 });

    return () => {
      if (trailLine) {
        trailLine.removeFrom(map);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, tail]);

  return null; // No need to render anything here as the marker is updated dynamically.
};

export default TrailComponent;
