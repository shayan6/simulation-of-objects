import React from "react";

const MapControls = ({
  handleRotate,
  originLatitude,
  handleOriginLatitudeChange,
  originLongitude,
  handleOriginLongitudeChange,
  destinationLatitude,
  handleDestinationLatitudeChange,
  destinationLongitude,
  handleDestinationLongitudeChange,
}) => {
  return (
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
  );
};

export default MapControls;
