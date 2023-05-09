import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Form, Input } from 'antd';
import FormModals from './FormModals';

const Index = () => {
  const { store, setStore } = useModel('equityRules', (model) => ({ ...model }));
  const onFinish = () => {
    // console.log('Success:', values);
  };

  const onClose = () => {
    setStore({ ...store, visible: false });
  };

  //
  const openTable = () => {
    setStore({ ...store, visibleTable: true });
  };

  return (
    <div>
      <ProCard title="添加权益规则" headerBordered>
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
            <div
              style={{ fontWeight: 'bold', color: '#409EFF', marginTop: 6, marginBottom: 12 }}
              onClick={() => {
                openTable();
              }}
            >
              选择商品
            </div>
            <p style={{ fontSize: 12, color: '#999999' }}>
              注：商品设置打折活动价时与商品会员等级价按实际情况做最低折扣计算成交价
            </p>
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
      <FormModals />
    </div>
  );
};
export default Index;
