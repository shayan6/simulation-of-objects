import React from "react";
import { List, Avatar, Space } from "antd";

function MarkerList({ markers }) {
  console.log(markers);
  return (
    <List
      dataSource={markers}
      renderItem={(item, index) => (
        <List.Item>
          <Space>
            <Avatar
              size={40}
              shape="square"
              style={{
                border: `1px solid ${item.color}`,
                backgroundColor: "#dddddd80",
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: item.icon }} />
            </Avatar>
            <div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: "bold" }}>
                Marker {index + 1} ({item.movement})
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Speed:</strong> {item.speed} km
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Destination:</strong> 
                {item.destinationLatitude}, {item.destinationLongitude}
              </p>
            </div>
          </Space>
        </List.Item>
      )}
    />
  );
}

export default MarkerList;
