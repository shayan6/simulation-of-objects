import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRotationAngle,
  setOriginLatitude,
  setOriginLongitude,
  setDestinationLatitude,
  setDestinationLongitude,
} from "../../actions/mapSlice";
import { Button, Input, Row, Col, Slider } from "antd";
import CustomMarkerModal from "../CustomMarkerModal";

const MapFilters = ({ markers, setMarkers }) => {
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState({
    color: "teal",
    speed: 100000,
    icon: `<i class="fas fa-plane" style="color: teal; font-size: 20px;"></i>`,
  });

  const handleRotate = (value) => {
    // Dispatch action to update rotation angle
    dispatch(setRotationAngle(value));
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
          <label htmlFor="originLongitude">Rotate:</label>
          <Slider
            min={0}
            max={180}
            step={1}
            value={rotationAngle}
            onChange={handleRotate}
          />
        </Col>
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
        <Col span={12}>
          <label htmlFor="destinationLatitude">Destination Lat:</label>
          <Input
            size="small"
            type="text"
            id="destinationLatitude"
            value={destinationLatitude}
            onChange={handleDestinationLatitudeChange}
          />
        </Col>
        <Col span={12}>
          <label htmlFor="destinationLongitude">Destination Lng:</label>
          <Input
            size="small"
            type="text"
            id="destinationLongitude"
            value={destinationLongitude}
            onChange={handleDestinationLongitudeChange}
          />
        </Col>
        <Col span={24}>
          <Button type="primary" size="small" onClick={showModal}>
            Add new marker
          </Button>
        </Col>
      </Row>
      <CustomMarkerModal
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
