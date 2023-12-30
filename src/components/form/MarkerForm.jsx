import React, { useEffect } from "react";
import { Form, Input, Select, Checkbox, Row, Col } from "antd";
import { iconOptions } from "../../utils";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCountries } from "../../actions/countrySlice";

const MarkerForm = ({ onInfoChange, markerInfo = {} }) => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);
  const sortedCountries = countries
    .slice()
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  const formItemLayout = {
    size: "middle",
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  const options = iconOptions(markerInfo);

  return (
    <Form className="marker-form" {...formItemLayout}>
      <Row gutter={16}>
        <Col span={24} sm={12}>
          <Form.Item label="Color">
            <SketchPicker
              color={markerInfo.color}
              onChange={(color) =>
                onInfoChange({ ...markerInfo, color: color.hex })
              }
            />
          </Form.Item>
          <Form.Item label="Speed in km">
            <Input
              value={markerInfo.speed}
              onChange={(e) =>
                onInfoChange({ ...markerInfo, speed: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Icon">
            <Select
              value={markerInfo.icon}
              onChange={(value) => onInfoChange({ ...markerInfo, icon: value })}
            >
              {options.map((option) => (
                <Select.Option key={option.value} value={option.icon}>
                  <span dangerouslySetInnerHTML={{ __html: option.icon }} />{" "}
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Movement Type">
            <Select
              value={markerInfo.movement}
              onChange={(value) =>
                onInfoChange({ ...markerInfo, movement: value })
              }
            >
              <Select.Option value="greatCircle">
                Move along a Great Circle
              </Select.Option>
              <Select.Option value="circularPath">
                Move along a Circular Path
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} sm={12}>
          <Form.Item label="Origin Country">
            <Select
              showSearch
              placeholder="Select origin country"
              optionFilterProp="children"
              onChange={(value) =>
                onInfoChange({ ...markerInfo, originCountry: value })
              }
              value={markerInfo.originCountry}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {sortedCountries.map((country) => (
                <Select.Option
                  key={country.name.common}
                  value={country.name.common}
                >
                  {country.name.common}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Origin latitude">
            <Input
              value={markerInfo.originLatitude}
              onChange={(e) =>
                onInfoChange({ ...markerInfo, originLatitude: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Origin longitude">
            <Input
              value={markerInfo.originLongitude}
              onChange={(e) =>
                onInfoChange({ ...markerInfo, originLongitude: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Destination Country">
            <Select
              showSearch
              placeholder="Select destination country"
              optionFilterProp="children"
              onChange={(value) =>
                onInfoChange({ ...markerInfo, destinationCountry: value })
              }
              value={markerInfo.destinationCountry}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {sortedCountries.map((country) => (
                <Select.Option
                  key={country.name.common}
                  value={country.name.common}
                >
                  {country.name.common}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Destination latitude">
            <Input
              value={markerInfo.destinationLatitude}
              onChange={(e) =>
                onInfoChange({
                  ...markerInfo,
                  destinationLatitude: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Destination longitude">
            <Input
              value={markerInfo.destinationLongitude}
              onChange={(e) =>
                onInfoChange({
                  ...markerInfo,
                  destinationLongitude: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Remove on arrival">
            <Checkbox
              checked={markerInfo.removeOnArrival}
              onChange={(e) =>
                onInfoChange({
                  ...markerInfo,
                  removeOnArrival: e.target.checked,
                })
              }
            >
              Enable
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default MarkerForm;
