import React from "react";
import { Modal, Form, Input } from "antd";

const CustomMarkerModal = ({ isVisible, onOk, onCancel, onInfoChange, markerInfo }) => {
  return (
    <Modal
      title="Custom Marker Configuration"
      visible={isVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form>
        <Form.Item label="Color">
          <Input
            value={markerInfo.color}
            onChange={(e) => onInfoChange("color", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Speed">
          <Input
            value={markerInfo.speed}
            onChange={(e) => onInfoChange("speed", e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomMarkerModal;
