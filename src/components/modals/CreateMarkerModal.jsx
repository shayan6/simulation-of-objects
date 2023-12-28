import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Checkbox, Row, Col } from "antd";
import { iconOptions } from "../../utils";
import { SketchPicker } from "react-color";
import { fetchAllCountries } from "../../actions/countrySlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatLngFromCountry } from "../../actions/locationSlice";

const formItemLayout = {
  size: "middle",
  labelCol: { span: 24 }, // Label takes up the full width
  wrapperCol: { span: 24 }, // Input takes up the full width
};

const { Option } = Select;

const CreateMarkerModal = ({
  isVisible,
  onOk,
  onCancel,
  onInfoChange,
  markerInfo,
  setMarkerInfo,
}) => {
  const dispatch = useDispatch();
  const options = iconOptions(markerInfo);
  const { countries } = useSelector((state) => state.country);
  const sortedCountries = countries
    .slice()
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

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
      <Form className="marker-form" {...formItemLayout}>
        <Row gutter={16}>
          <Col span={24} sm={12}>
            <Form.Item label="Color">
              {/* Use the SketchPicker component for color selection */}
              <SketchPicker
                color={markerInfo.color}
                onChange={(color) => onInfoChange("color", color.hex)}
              />
            </Form.Item>
            <Form.Item label="Speed in km">
              <Input
                value={markerInfo.speed}
                onChange={(e) => onInfoChange("speed", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Icon">
              <Select
                value={markerInfo.icon}
                onChange={(value) => onInfoChange("icon", value)}
              >
                {options.map((option) => (
                  <Option key={option.value} value={option.icon}>
                    <span dangerouslySetInnerHTML={{ __html: option.icon }} />{" "}
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Movement Type">
              <Select
                value={markerInfo.movement}
                onChange={(value) => onInfoChange("movement", value)}
              >
                <Option value="greatCircle">Move along a Great Circle</Option>
                <Option value="circularPath">Move along a Circular Path</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} sm={12}>
            <Form.Item label="Origin Country">
              <Select
                showSearch
                placeholder="Select origin country"
                optionFilterProp="children"
                onChange={(value) => onInfoChange("originCountry", value)}
                value={markerInfo.originCountry}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {sortedCountries.map((country) => (
                  <Option key={country.name.common} value={country.name.common}>
                    {country.name.common}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Origin latitude">
              <Input
                value={markerInfo.originLatitude}
                onChange={(e) => onInfoChange("originLatitude", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Origin longitude">
              <Input
                value={markerInfo.originLongitude}
                onChange={(e) =>
                  onInfoChange("originLongitude", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Destination Country">
              <Select
                showSearch
                placeholder="Select destination country"
                optionFilterProp="children"
                onChange={(value) => onInfoChange("destinationCountry", value)}
                value={markerInfo.destinationCountry}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {sortedCountries.map((country) => (
                  <Option key={country.name.common} value={country.name.common}>
                    {country.name.common}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Destination latitude">
              <Input
                value={markerInfo.destinationLatitude}
                onChange={(e) =>
                  onInfoChange("destinationLatitude", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Destination longitude">
              <Input
                value={markerInfo.destinationLongitude}
                onChange={(e) =>
                  onInfoChange("destinationLongitude", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Remove on arrival">
              <Checkbox
                checked={markerInfo.removeOnArrival}
                onChange={(e) =>
                  onInfoChange("removeOnArrival", e.target.checked)
                }
              >
                Enable
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateMarkerModal;
