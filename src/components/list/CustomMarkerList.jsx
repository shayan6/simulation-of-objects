import React, { useEffect, useState } from "react";
import { List, Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

function MarkerList({ markers }) {
  const [dataSource, setDataSource] = useState(markers);

  useEffect(() => {
    const dataArray = Object.values(markers);
    const reversedArray = dataArray.slice().reverse();
    setDataSource(reversedArray);
  }, [markers]);

  return (
    <List
      dataSource={dataSource}
      renderItem={(item, index) => (
        <List.Item>
          <Card
            className="marker-card"
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
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
              }
              title={`Marker ${index + 1} (${item.movement})`}
              description={
                <div className="marker-description">
                  <p>
                    <strong>Speed:</strong> {item.speed} km
                  </p>
                  <p>
                    <strong>Origin:</strong> {item.originCountry}
                  </p>
                  <p>
                    <strong>Destination:</strong> {item.destinationCountry}
                  </p>
                </div>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default MarkerList;
