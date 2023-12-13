import React, { useState } from "react";
import MapWithPlaces from "./components/MapWithPlaces";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./App.css";
import MapControls from "./components/controls/MapControls";

const App = () => {
  const [markers, setMarkers] = useState([]);
  return (
    <div className="container">
      <MapControls markers={markers} setMarkers={setMarkers} />
      <MapWithPlaces markers={markers} />
    </div>
  );
};

export default App;
