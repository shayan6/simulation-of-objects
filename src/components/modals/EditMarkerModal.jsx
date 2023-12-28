import { Form, Input, Modal } from "antd";

const EditMarkerForm = ({ visible, onCreate, onCancel, marker }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Edit Marker"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" initialValues={{ ...marker }}>
        <Form.Item name="speed" label="Speed">
          <Input type="number" />
        </Form.Item>
        {/* Add other fields as needed */}
      </Form>
    </Modal>
  );
};

export default EditMarkerForm;
