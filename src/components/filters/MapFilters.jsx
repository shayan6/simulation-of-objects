import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 function from the uuid library
import {
  addMarker,
  destinationLatitude,
  destinationLongitude,
  originLatitude,
  originLongitude,
} from "../../actions/markersSlice";
import { Button, Row, Col, Typography } from "antd";
import CreateMarkerModal from "../modals/CreateMarkerModal";
import { useDispatch, useSelector } from "react-redux";

const MapFilters = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.markers.list);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState({
    color: "teal",
    speed: 300000, // speed of light
    icon: `<i class="fas fa-plane" style="color: teal; font-size: 20px;"></i>`,
    movement: "greatCircle",
    removeOnArival: false,
    destinationLatitude,
    destinationLongitude,
    originLatitude,
    originLongitude,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(addMarker([...markers, {  id: uuidv4(), ...markerInfo }]));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  return (
    <div className="controls">
      <Row gutter={[8, 16]}>
        <Col span={10}>
          <Typography.Text>Markers list</Typography.Text>
        </Col>
        <Col span={14}>
          <Button type="primary" size="middle" onClick={showModal}>
           + Add new marker
          </Button>
        </Col>
      </Row>
      <CreateMarkerModal
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        markerInfo={markerInfo}
        setMarkerInfo={setMarkerInfo}
      />
    </div>
  );
};

export default MapFilters;
