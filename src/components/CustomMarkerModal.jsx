import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { iconOptions } from "../utils";
import { SketchPicker } from "react-color";


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
          {/* Use the SketchPicker component for color selection */}
          <SketchPicker
            color={markerInfo.color}
            onChange={(color) => onInfoChange("color", color.hex)}
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
              <Option key={option.value} value={option.icon}>
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
