import React from "react";
import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const CustomMarkerModal = ({ isVisible, onOk, onCancel, onInfoChange, markerInfo }) => {
  const iconOptions = [
    { value: "plane", label: "Plane", icon: `<i class="fas fa-plane" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "car", label: "Car", icon: `<i class="fas fa-car" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    // Add more icon options as needed
  ];

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
            {iconOptions.map((option) => (
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
