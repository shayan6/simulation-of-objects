import React from 'react';
import MapWithPlaces from './components/MapWithPlaces';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS
import './App.css';

const App = () => {
  return (
    <div className="container">
      <MapWithPlaces />
    </div>
  );
};

export default App;
