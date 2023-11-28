import React, { useState } from 'react';
import MapWithPlaces from './components/MapWithPlaces';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS
import './App.css';

const App = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const handleRotate = () => {
    // Update the rotation angle, e.g., increment by 45 degrees
    setRotationAngle(rotationAngle + 90);
  };

  return (
    <div className="container">
      <button className="rotate-btn" onClick={handleRotate}>Rotate Map</button>
      <MapWithPlaces rotationAngle={rotationAngle} />
    </div>
  );
};

export default App;
