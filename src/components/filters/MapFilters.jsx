import React, { useState } from "react";
import {
  destinationLatitude,
  destinationLongitude,
  originLatitude,
  originLongitude,
} from "../../actions/markersSlice";
import { Button, Row, Col } from "antd";
import CreateMarkerModal from "../create/CreateMarkerModal";

const MapFilters = ({ markers, setMarkers }) => {
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
    setMarkers([...markers, { ...markerInfo }]);
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
        <Col span={24}>
          <Button type="primary" size="small" onClick={showModal}>
            Add new marker
          </Button>
        </Col>
      </Row>
      <CreateMarkerModal
        isVisible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        onInfoChange={handleMarkerInfoChange}
        markerInfo={markerInfo}
      />
    </div>
  );
};

export default MapFilters;
