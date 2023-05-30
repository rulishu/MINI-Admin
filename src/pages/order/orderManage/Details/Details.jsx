import { ImportOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, FloatButton, Space, Table, Tabs, Typography } from 'antd';
import { useState } from 'react';
import { basicItem, buyerItem, manageColumn, productItem, receiveItem } from './items';

export default function Edit() {
  const dispatch = useDispatch();
  const { queryData } = useSelector((state) => state.orderManage);
  const [activeKey, setKey] = useState('1');

  const updateFn = (payload) => {
    dispatch({
      type: 'orderManage/update',
      payload: payload,
    });
  };

  const handleCancel = () => updateFn({ visible: false });

  const items = [
    {
      key: '1',
      label: `包裹1`,
      children: <ProDescriptions column={3} dataSource={queryData} columns={productItem} />,
    },
    {
      key: '2',
      label: `包裹2`,
      children: <ProDescriptions column={3} dataSource={queryData} columns={productItem} />,
    },
  ];

  return (
    <Space direction="vertical">
      <FloatButton
        onClick={handleCancel}
        icon={<ImportOutlined />}
        type="primary"
        style={{ right: 24 }}
      />
      <Card title="订单信息">
        <ProDescriptions
          editable={{
            onSave: async (keypath, newInfo, oriInfo) => {
              console.log(keypath, newInfo, oriInfo);
              return true;
            },
          }}
          column={4}
          dataSource={queryData}
          columns={basicItem}
        />
      </Card>

      <Card>
        <ProDescriptions title="买家信息" column={4} dataSource={queryData} columns={buyerItem} />
        <ProDescriptions title="收货信息" column={4} dataSource={queryData} columns={receiveItem} />
      </Card>

      <Card title="包裹信息">
        <Tabs
          destroyInactiveTabPane={true}
          activeKey={activeKey}
          items={items}
          size="small"
          onChange={(key) => setKey(key)}
        />
      </Card>

      <Card title="商品信息">
        <Table
          columns={manageColumn}
          dataSource={queryData.itemList || []}
          rowKey="itemName"
          scroll={{ x: 1300 }}
        />
        <Typography.Text style={{ float: 'right', marginTop: 24 }}>
          商品总价：￥450.00 运费：￥0.00 优惠卷：-￥0.00 订单金额：￥450.00
        </Typography.Text>
      </Card>
    </Space>
  );
}
