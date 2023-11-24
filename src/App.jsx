import React from 'react';
import Map from './components/Map';
import Square from './components/Square';
import Circle from './components/Circle';
import Triangle from './components/Triangle';
import Controls from './components/Controls';

const initialPosition = [58.595272, 25.013607]; // Estonia's coordinates

function App() {
  return (
    <div className="App">
      <Map center={initialPosition} zoom={6}>
        <Square initialPosition={initialPosition} />
        {/* <Circle initialPosition={initialPosition} />
        <Triangle initialPosition={initialPosition} /> */}
      </Map>

      <div className="controls">
        <Controls objectType="squares" label="Show Squares" />
        {/* <Controls objectType="circles" label="Show Circles" />
        <Controls objectType="triangles" label="Show Triangles" /> */}
      </div>
    </div>
  );
}

export default App;
