import React from "react";
import { List, Avatar, Space } from "antd";

const MarkerList = ({ markers }) => (
  <List
    dataSource={markers}
    renderItem={(item, index) => (
      <List.Item>
        <Space>
          <Avatar
            size={40}
            shape="square"
            style={{ border: `1px solid ${item.color}`, backgroundColor: '#dddddd80' }}
          >
            <span dangerouslySetInnerHTML={{ __html: item.icon }} />
          </Avatar>
          <div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: "bold" }}>
              Marker {index + 1}
            </p>
            <p style={{ margin: 0 }}>Speed: {item.speed}</p>
          </div>
        </Space>
      </List.Item>
    )}
  />
);

export default MarkerList;
