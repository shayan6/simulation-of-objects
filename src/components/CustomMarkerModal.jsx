import React from "react";
import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const CustomMarkerModal = ({ isVisible, onOk, onCancel, onInfoChange, markerInfo }) => {
  const iconOptions = [ 
    { value: "plane", label: "Plane", icon: `<i class="fas fa-plane" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "car", label: "Car", icon: `<i class="fas fa-car" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "bicycle", label: "Bicycle", icon: `<i class="fas fa-bicycle" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "bus", label: "Bus", icon: `<i class="fas fa-bus" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "ship", label: "Ship", icon: `<i class="fas fa-ship" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "train", label: "Train", icon: `<i class="fas fa-train" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "motorcycle", label: "Motorcycle", icon: `<i class="fas fa-motorcycle" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "subway", label: "Subway", icon: `<i class="fas fa-subway" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "truck", label: "Truck", icon: `<i class="fas fa-truck" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "shuttle-van", label: "Shuttle Van", icon: `<i class="fas fa-shuttle-van" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "taxi", label: "Taxi", icon: `<i class="fas fa-taxi" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "helicopter", label: "Helicopter", icon: `<i class="fas fa-helicopter" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "ambulance", label: "Ambulance", icon: `<i class="fas fa-ambulance" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "ship", label: "Ship", icon: `<i class="fas fa-ship" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "rocket", label: "Rocket", icon: `<i class="fas fa-rocket" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "bus-alt", label: "Bus Alt", icon: `<i class="fas fa-bus-alt" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "bicycle", label: "Bicycle", icon: `<i class="fas fa-bicycle" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "walking", label: "Walking", icon: `<i class="fas fa-walking" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "truck-monster", label: "Truck Monster", icon: `<i class="fas fa-truck-monster" style="color: ${markerInfo.color}; font-size: 20px;"></i>` },
    { value: "circle", label: "Circle", icon: `<div style="display: inline-block; width: 20px; height: 20px; background-color: ${markerInfo.color}; border-radius: 50%;"></div>` },
    { value: "square", label: "Square", icon: `<div style="display: inline-block; width: 20px; height: 20px; background-color: ${markerInfo.color};"></div>` },
    { value: "triangle", label: "Triangle", icon: `<div style="display: inline-block; width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 17.3px solid ${markerInfo.color};"></div>` },
    { value: "heart", label: "Heart", icon: `<div style="display: inline-block; width: 20px; height: 20px; background-color: ${markerInfo.color}; transform: rotate(-45deg); position: relative;"><div style="position: absolute; width: 100%; height: 100%; transform: rotate(45deg); background-color: ${markerInfo.color};"></div></div>` },
    { value: "pentagon", label: "Pentagon", icon: `<div style="display: inline-block; width: 20px; height: 20px; background-color: ${markerInfo.color}; clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);"></div>` },
    { value: "hexagon", label: "Hexagon", icon: `<div style="display: inline-block; width: 20px; height: 20px; background-color: ${markerInfo.color}; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"></div>` },
    { value: "star", label: "Star", icon: `<div style="display: inline-block; width: 0; height: 0; margin: 10px 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 17.5px solid ${markerInfo.color}; position: relative;"><div style="position: absolute; width: 0; height: 0; margin: -12.5px 0 0 -8.5px; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 17.5px solid ${markerInfo.color};"></div></div>` },
    { value: "diamond", label: "Diamond", icon: `<div style="display: inline-block; width: 20px; height: 20px; background-color: ${markerInfo.color}; transform: rotate(45deg);"></div>` },
    { value: "oval", label: "Oval", icon: `<div style="display: inline-block; width: 20px; height: 10px; background-color: ${markerInfo.color}; border-radius: 50%;"></div>` },
    { value: "rectangle", label: "Rectangle", icon: `<div style="display: inline-block; width: 20px; height: 10px; background-color: ${markerInfo.color};"></div>` },
    { value: "octagon", label: "Octagon", icon: `<div style="display: inline-block; width: 20px; height: 20px; background-color: ${markerInfo.color}; clip-path: polygon(14% 0%, 86% 0%, 100% 14%, 100% 86%, 86% 100%, 14% 100%, 0% 86%, 0% 14%);"></div>` }, 
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
