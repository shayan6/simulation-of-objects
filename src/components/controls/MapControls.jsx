import React from "react";
import MarkerList from "../list/CustomMarkerList";
import { Card } from "antd";
import MapFilters from "../filters/MapFilters";

const MapControls = () => {
  return (
    <Card className="controls-btn">
      <MapFilters/>
      <MarkerList/>
    </Card>
  );
};

export default MapControls;
