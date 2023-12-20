import React from "react";
import MarkerList from "../list/CustomMarkerList";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import MapFilters from "../filters/MapFilters";
import { useDispatch, useSelector } from "react-redux";
import { addMarker } from "../../actions/markersSlice"; 

const MapControls = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.markers.list);
  const setMarkers = (newMarkers) => {
    // Dispatch an action to update markers in the Redux store
    dispatch(addMarker(newMarkers));
  };

  return (
    <div className="controls-btn">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Add new marker" key="1">
          <MapFilters markers={markers} setMarkers={setMarkers} />
        </TabPane>
        <TabPane tab="Custom marker list" key="2">
          <MarkerList markers={markers} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MapControls;
