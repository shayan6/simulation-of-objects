import React from "react";
import { List } from "antd";

const MarkerList = ({ markers }) => (
  <List
    dataSource={markers}
    renderItem={(item, index) => (
      <List.Item>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ marginRight: 8 }}
            dangerouslySetInnerHTML={{ __html: item.icon }}
          />
          <span style={{ marginRight: 8 }}>Speed: {item.speed}</span>
        </div>
      </List.Item>
    )}
  />
);

export default MarkerList;
