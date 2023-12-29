import React, { useEffect } from "react";
import { Modal } from "antd";
import { fetchAllCountries } from "../../actions/countrySlice";
import { useDispatch } from "react-redux";
import { fetchLatLngFromCountry } from "../../actions/locationSlice";
import MarkerForm from "../form/MarkerForm";

const CreateMarkerModal = ({
  isVisible,
  onOk,
  onCancel,
  markerInfo,
  setMarkerInfo,
}) => {
  const dispatch = useDispatch();

  const handleInfoChange = (updatedInfo) => {
    setMarkerInfo(updatedInfo);
  };

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  useEffect(() => {
    if (markerInfo?.originCountry) {
      handleOriginChange(markerInfo.originCountry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, markerInfo.originCountry]);

  useEffect(() => {
    if (markerInfo?.destinationCountry) {
      handleDestinationChange(markerInfo.destinationCountry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, markerInfo.destinationCountry]);

  async function handleOriginChange(originCountry) {
    const response = await dispatch(fetchLatLngFromCountry(originCountry));
    const { latitude, longitude } = response?.payload || {};
    setMarkerInfo({
      ...markerInfo,
      originLatitude: latitude,
      originLongitude: longitude,
    });
  }

  async function handleDestinationChange(destinationCountry) {
    const response = await dispatch(fetchLatLngFromCountry(destinationCountry));
    const { latitude, longitude } = response.payload || {};
    setMarkerInfo({
      ...markerInfo,
      destinationLatitude: latitude,
      destinationLongitude: longitude,
    });
  }

  return (
    <Modal
      title="Custom Marker Configuration"
      open={isVisible}
      onOk={onOk}
      onCancel={onCancel}
      width={1000}
    >
      <MarkerForm onInfoChange={handleInfoChange} markerInfo={markerInfo} />
    </Modal>
  );
};

export default CreateMarkerModal;
