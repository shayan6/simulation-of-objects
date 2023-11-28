import React, { useState } from "react";
import MapWithPlaces from "./components/MapWithPlaces";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./App.css";

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
      <div className="controls-btn">
        <button onClick={handleRotate}>
          <i className="fas fa-sync-alt"></i> <span>Rotate</span>
        </button>
        <div className="input-row">
          <div>
            <label htmlFor="originLatitude">Origin Lat:</label>
            <input
              type="text"
              id="originLatitude"
              value={originLatitude}
              onChange={handleOriginLatitudeChange}
              className="small-input"
            />
          </div>
          <div>
            <label htmlFor="originLongitude">Origin Lng:</label>
            <input
              type="text"
              id="originLongitude"
              value={originLongitude}
              onChange={handleOriginLongitudeChange}
              className="small-input"
            />
          </div>
        </div>
        <div className="input-row">
          <div>
            <label htmlFor="destinationLatitude">Destination Lat:</label>
            <input
              type="text"
              id="destinationLatitude"
              value={destinationLatitude}
              onChange={handleDestinationLatitudeChange}
              className="small-input"
            />
          </div>
          <div>
            <label htmlFor="destinationLongitude">Destination Lng:</label>
            <input
              type="text"
              id="destinationLongitude"
              value={destinationLongitude}
              onChange={handleDestinationLongitudeChange}
              className="small-input"
            />
          </div>
        </div>
      </div>
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
