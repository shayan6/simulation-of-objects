import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOriginLatitude,
  setOriginLongitude,
} from "../../actions/mapSlice";
import { destinationLatitude, destinationLongitude } from "../../actions/markersSlice";
import { Button, Input, Row, Col } from "antd";
import CreateMarkerModal from "../create/CreateMarkerModal";

const MapFilters = ({ markers, setMarkers }) => {
  const dispatch = useDispatch();
  const originLatitude = useSelector((state) => state.map.originLatitude);
  const originLongitude = useSelector((state) => state.map.originLongitude);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState({
    color: "teal",
    speed: 100000,
    icon: `<i class="fas fa-plane" style="color: teal; font-size: 20px;"></i>`,
    movement: 'greatCircle',
    removeOnArival: false,
    destinationLatitude,
    destinationLongitude
  });

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
        <Col span={12}>
          <label htmlFor="originLatitude">Origin Lat:</label>
          <Input
            size="small"
            type="text"
            id="originLatitude"
            value={originLatitude}
            onChange={handleOriginLatitudeChange}
          />
        </Col>
        <Col span={12}>
          <label htmlFor="originLongitude">Origin Lng:</label>
          <Input
            size="small"
            type="text"
            id="originLongitude"
            value={originLongitude}
            onChange={handleOriginLongitudeChange}
          />
        </Col>
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
