import React from "react";
import MarkerList from "../list/CustomMarkerList";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import MapFilters from "../filters/MapFilters";

const MapControls = ({ markers, setMarkers }) => {
  return (
    <div className="controls-btn">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Filters" key="1">
          <MapFilters markers={markers} setMarkers={setMarkers} />
        </TabPane>
        <TabPane tab="Custom Marker List" key="2">
          <MarkerList markers={markers} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MapControls;
