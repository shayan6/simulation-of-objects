import React from "react";
import MarkerList from "../list/CustomMarkerList";
import { Card } from "antd";
import MapFilters from "../filters/MapFilters";
import { useDispatch, useSelector } from "react-redux";
import { addMarker } from "../../actions/markersSlice"; 

const MapControls = () => {

  const dispatch = useDispatch();
  const markers = useSelector((state) => state.markers.list);

  const setMarkers = (newMarkers) => {
    dispatch(addMarker(newMarkers));
  };
  
  return (
    <Card className="controls-btn">
      <MapFilters markers={markers} setMarkers={setMarkers} />
      <MarkerList markers={markers} />
    </Card>
  );
};

export default MapControls;
