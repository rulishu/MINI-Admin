import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Form, Input } from 'antd';

const Index = () => {
  const { store, setStore } = useModel('equityRules', (model) => ({ ...model }));
  const onFinish = () => {
    // console.log('Success:', values);
  };

  const onClose = () => {
    setStore({ ...store, visible: false });
  };

  return (
    <div>
      <ProCard title="添加权益规则">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="规则名称"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入规则名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="规则描述"
            name="context"
            rules={[
              {
                required: true,
                message: '请输入规则描述!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="权益商品"
            name="password"
            rules={[
              {
                required: true,
                message: '请选择权益商品!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button style={{ marginRight: 8 }} onClick={() => onClose()}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </ProCard>
    </div>
  );
};
export default Index;
