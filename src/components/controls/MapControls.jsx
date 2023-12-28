import React from "react";
import MarkerList from "../list/CustomMarkerList";
import { Card, Tabs } from "antd";
import MapFilters from "../filters/MapFilters";
import { useDispatch, useSelector } from "react-redux";
import { addMarker } from "../../actions/markersSlice"; 

const MapControls = () => {

  const dispatch = useDispatch();
  const markers = useSelector((state) => state.markers.list);

  const setMarkers = (newMarkers) => {
    dispatch(addMarker(newMarkers));
  };

  const items = [
    {
      key: '1',
      label: 'Custom marker list',
      children: <MarkerList markers={markers} />,
    },
    {
      key: '2',
      label: 'Add new marker',
      children: <MapFilters markers={markers} setMarkers={setMarkers} />,
    },
  ];
  
  return (
    <Card className="controls-btn">
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  );
};

export default MapControls;
