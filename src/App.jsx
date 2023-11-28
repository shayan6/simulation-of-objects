import React, { useState } from "react";
import MapWithPlaces from "./components/MapWithPlaces";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./App.css";
import MapControls from "./components/MapControls";

const App = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [originLatitude, setOriginLatitude] = useState(59.437);
  const [originLongitude, setOriginLongitude] = useState(24.7536);
  const [destinationLatitude, setDestinationLatitude] = useState(59.3218031);
  const [destinationLongitude, setDestinationLongitude] = useState(24.5520983);

  const handleOriginLatitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setOriginLatitude(value);
    }
  };

  const handleOriginLongitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setOriginLongitude(value);
    }
  };

  const handleDestinationLatitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setDestinationLatitude(value);
    }
  };

  const handleDestinationLongitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setDestinationLongitude(value);
    }
  };

  const handleRotate = () => {
    // Update the rotation angle, e.g., increment by 45 degrees
    setRotationAngle(rotationAngle + 90);
  };

  return (
    <div className="container">
      <MapControls
        handleRotate={handleRotate}
        originLatitude={originLatitude}
        handleOriginLatitudeChange={handleOriginLatitudeChange}
        originLongitude={originLongitude}
        handleOriginLongitudeChange={handleOriginLongitudeChange}
        destinationLatitude={destinationLatitude}
        handleDestinationLatitudeChange={handleDestinationLatitudeChange}
        destinationLongitude={destinationLongitude}
        handleDestinationLongitudeChange={handleDestinationLongitudeChange}
      />
      <MapWithPlaces
        rotationAngle={rotationAngle}
        originLatitude={originLatitude}
        originLongitude={originLongitude}
        destinationLatitude={destinationLatitude}
        destinationLongitude={destinationLongitude}
      />
    </div>
  );
};

export default App;
