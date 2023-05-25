import { PlusOutlined } from '@ant-design/icons';
import { App, Button, Form, Input, Modal, Upload } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const { TextArea } = Input;

const OriderAdd = ({ onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const onFinish = async (values) => {
    setConfirmLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('inventory', values.inventory);
      formData.append('image', values.image[0].originFileObj);

      await axios.post('/api/wines', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('添加成功');
      onAdd();
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    maxCount: 1,
    listType: 'picture-card',
  };

  return (
    <>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => setVisible(true)}>
        <PlusOutlined /> 添加新酒
      </Button>
      <Modal
        title="添加新酒"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={confirmLoading}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="价格" rules={[{ required: true }]}>
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="description" label="描述" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="inventory" label="库存量" rules={[{ required: true }]}>
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="image"
            label="图片"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true }]}
          >
            <Upload {...uploadProps}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OriderAdd;
