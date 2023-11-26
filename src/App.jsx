import React from 'react';
import MapWithPlaces from './components/MapWithPlaces';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS

const App = () => {
  return (
    <div className="App">
      <h1>Map with Places</h1>
      <MapWithPlaces />
    </div>
  );
};

export default App;
