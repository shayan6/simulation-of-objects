import React, { useState } from "react";
import {
  addMarker,
  destinationLatitude,
  destinationLongitude,
  originLatitude,
  originLongitude,
} from "../../actions/markersSlice";
import { Button, Row, Col, Typography, Divider } from "antd";
import CreateMarkerModal from "../create/CreateMarkerModal";
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
    dispatch(addMarker([...markers, { ...markerInfo }]));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMarkerInfoChange = (fieldName, value) => {
    setMarkerInfo({ ...markerInfo, [fieldName]: value });
  };

  return (
    <div className="controls">
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <Typography.Text>Markers list</Typography.Text>
        </Col>
        <Col span={12}>
          <Button type="primary" size="middle" onClick={showModal}>
            Add new marker
          </Button>
        </Col>
        <Col span={24}>
          <Divider></Divider>
        </Col>
      </Row>
      <CreateMarkerModal
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        onInfoChange={handleMarkerInfoChange}
        markerInfo={markerInfo}
        setMarkerInfo={setMarkerInfo}
      />
    </div>
  );
};

export default MapFilters;
