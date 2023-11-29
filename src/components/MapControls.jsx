import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRotationAngle,
  setOriginLatitude,
  setOriginLongitude,
  setDestinationLatitude,
  setDestinationLongitude,
} from "../actions/mapSlice";

const MapControls = () => {
  const dispatch = useDispatch();
  const rotationAngle = useSelector((state) => state.map.rotationAngle);
  const originLatitude = useSelector((state) => state.map.originLatitude);
  const originLongitude = useSelector((state) => state.map.originLongitude);
  const destinationLatitude = useSelector(
    (state) => state.map.destinationLatitude
  );
  const destinationLongitude = useSelector(
    (state) => state.map.destinationLongitude
  );

  const handleRotate = () => {
    // Dispatch action to update rotation angle
    dispatch(setRotationAngle(rotationAngle + 90));
  };

  const handleOriginLatitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      // Dispatch action to update origin latitude
      dispatch(setOriginLatitude(value));
    }
  };

  const handleOriginLongitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      // Dispatch action to update origin longitude
      dispatch(setOriginLongitude(value));
    }
  };

  const handleDestinationLatitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      // Dispatch action to update destination latitude
      dispatch(setDestinationLatitude(value));
    }
  };

  const handleDestinationLongitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      // Dispatch action to update destination longitude
      dispatch(setDestinationLongitude(value));
    }
  };

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
