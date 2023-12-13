import React from "react";
import { Row, Col, Slider, Input } from "antd";

const MapFilters = ({
  rotationAngle,
  originLatitude,
  originLongitude,
  destinationLatitude,
  destinationLongitude,
  handleRotate,
  handleOriginLatitudeChange,
  handleOriginLongitudeChange,
  handleDestinationLatitudeChange,
  handleDestinationLongitudeChange,
}) => (
  <Row gutter={[8, 16]}>
    <Col span={24}>
      <label htmlFor="originLongitude">Rotate:</label>
      <Slider
        min={0}
        max={360}
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
  </Row>
);

export default MapFilters;
