import React from "react";
import { Modal } from "antd";
import MarkerForm from "../form/MarkerForm";

const EditMarkerModal = ({
  visible,
  onCreate,
  onCancel,
  markerInfo,
  setMarkerInfo,
}) => {

  const handleInfoChange = (updatedInfo) => {
    setMarkerInfo(updatedInfo);
  };

  return (
    <Modal
      title="Edit Marker Configuration"
      open={visible}
      onOk={onCreate}
      onCancel={onCancel}
      width={1000}
    >
      <MarkerForm
        onInfoChange={handleInfoChange}
        markerInfo={markerInfo}
      />
    </Modal>
  );
};

export default EditMarkerModal;
