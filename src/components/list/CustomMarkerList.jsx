import React from "react";
import { List } from "antd";

const MarkerList = ({ markers }) => (
  <List
    dataSource={markers}
    renderItem={(item, index) => (
      <List.Item>
        <span>{`Marker ${index + 1}: ${item.color}, ${item.speed}, ${item.icon}`}</span>
      </List.Item>
    )}
  />
);

export default MarkerList;
