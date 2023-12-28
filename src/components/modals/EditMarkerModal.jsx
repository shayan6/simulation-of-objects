import React from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { editMarker } from "../../actions/markersSlice"; // Import your editMarker action
import MarkerForm from "../form/MarkerForm";

const EditMarkerModal = ({
  visible,
  onOk,
  onCancel,
  markerInfo,
  setMarkerInfo,
}) => {
  const dispatch = useDispatch();

  const handleInfoChange = (updatedInfo) => {
    setMarkerInfo(updatedInfo);
  };

  const handleOk = () => {
    // Dispatch the editMarker action with the updated marker info
    dispatch(editMarker({ id: markerInfo.id, updatedMarker: markerInfo }));
    onOk();
  };

  return (
    <Modal
      title="Edit Marker Configuration"
      open={visible}
      onOk={handleOk}
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
