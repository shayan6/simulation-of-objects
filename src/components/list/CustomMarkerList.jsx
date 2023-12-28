import React, { useEffect, useState } from "react";
import { List, Avatar, Card, Modal } from "antd";
import {
  EditOutlined,
  RocketOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useSelector, useDispatch } from "react-redux";
import { deleteMarker, editMarker } from "../../actions/markersSlice";
import EditMarkerForm from "../modals/EditMarkerModal";

function MarkerList() {
  const markers = useSelector((state) => state.markers.list);
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState(markers);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingMarker, setEditingMarker] = useState(null);

  useEffect(() => {
    const dataArray = Object.values(markers);
    const reversedArray = dataArray.slice().reverse();
    setDataSource(reversedArray);
  }, [markers]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Marker",
      content: "Are you sure you want to delete this marker?",
      onOk() {
        dispatch(deleteMarker({ id }));
      },
    });
  };

  const handleEdit = (id) => {
    const markerToEdit = markers.find((marker) => marker.id === id);
    setEditingMarker(markerToEdit);
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditingMarker(null);
  };

  const handleEditModalCreate = (values) => {
    dispatch(editMarker({ id: editingMarker.id, updatedMarker: values }));
    setEditModalVisible(false);
    setEditingMarker(null);
  };

  return (
    <div>
      <List
        dataSource={dataSource}
        renderItem={(item, index) => (
          <List.Item>
            <Card
              className="marker-card"
              actions={[
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDelete(item.id)}
                />,
                <EditOutlined key="edit" onClick={() => handleEdit(item.id)} />,
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

      {editingMarker && (
        <EditMarkerForm
          visible={editModalVisible}
          onCreate={handleEditModalCreate}
          onCancel={handleEditModalCancel}
          marker={editingMarker}
        />
      )}
    </div>
  );
}

export default MarkerList;
