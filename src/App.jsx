import React from "react";
import MapWithPlaces from "./components/MapWithPlaces";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./App.css";
import MapControls from "./components/controls/MapControls";

const App = () => {
  return (
    <div className="container">
      <MapControls />
      <MapWithPlaces />
    </div>
  );
};

export default App;
