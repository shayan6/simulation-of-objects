import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRotationAngle,
  setOriginLatitude,
  setOriginLongitude,
  setDestinationLatitude,
  setDestinationLongitude,
} from "../actions/mapSlice";
import { Button, Input, Row, Col } from "antd";
import { SyncOutlined } from "@ant-design/icons";

const MapControls = () => {
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

  const handleRotate = () => {
    // Dispatch action to update rotation angle
    dispatch(setRotationAngle(rotationAngle + 90));
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

  return (
    <div className="controls-btn">
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <Button size="small" onClick={handleRotate}>
            <SyncOutlined /> <span>Rotate</span>
          </Button>
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
      </Row>
    </div>
  );
};

export default MapControls;
