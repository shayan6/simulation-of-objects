import React, { useEffect, useState } from "react";
import { List, Avatar, Card } from "antd";
import {
  EditOutlined,
  RocketOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useSelector } from "react-redux";

function MarkerList() {
  const markers = useSelector((state) => state.markers.list);
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
              <DeleteOutlined key="delete" />,
              <EditOutlined key="edit" />,
              <RocketOutlined key="view" />,
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
