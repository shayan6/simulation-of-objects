import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { iconOptions } from "../../utils";
import { SketchPicker } from "react-color";


const { Option } = Select;

const CreateMarkerModal = ({ isVisible, onOk, onCancel, onInfoChange, markerInfo }) => {
  const options = iconOptions(markerInfo);

  return (
    <Modal
      title="Custom Marker Configuration"
      open={isVisible}
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
        <Form.Item label="Speed in km">
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
        <Form.Item label="Movement Type">
          <Select
            value={markerInfo.movement}
            onChange={(value) => onInfoChange("movement", value)}
          >
            <Option value="greatCircle">Move along a Great Circle</Option>
            <Option value="circularPath">Move along a Circular Path</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMarkerModal;
