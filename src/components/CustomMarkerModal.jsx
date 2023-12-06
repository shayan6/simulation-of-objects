import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { iconOptions } from "../utils";

const { Option } = Select;

const CustomMarkerModal = ({ isVisible, onOk, onCancel, onInfoChange, markerInfo }) => {
  const options = iconOptions(markerInfo);

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
        <Form.Item label="Icon">
          <Select
            value={markerInfo.icon}
            onChange={(value) => onInfoChange("icon", value)}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                <span dangerouslySetInnerHTML={{ __html: option.icon }} /> {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomMarkerModal;
