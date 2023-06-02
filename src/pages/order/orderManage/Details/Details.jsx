import { getInfoPushList } from '@/service/order/orderManage';
import { ImportOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Card, Empty, FloatButton, Space, Table, Tabs, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { basicItem, buyerItem, manageColumn, productItem, receiveItem } from './items';

export default function Edit() {
  const dispatch = useDispatch();
  const { queryData, visible } = useSelector((state) => state.orderManage);

  // 包裹信息
  const { run, loading, data } = useRequest(getInfoPushList, {
    manual: false,
  });

  useEffect(() => {
    if (visible) {
      run({ id: queryData.id });
    }
  }, [visible]);

  const updateFn = (payload) => {
    dispatch({
      type: 'orderManage/update',
      payload: payload,
    });
  };

  const handleCancel = () => updateFn({ visible: false });

  const packageListItems = useMemo(() => {
    const datas = data && data.result ? data.result : [];
    if (datas.length > 0) {
      return datas.map((item, i) => {
        return {
          key: String(i + 1),
          label: `包裹${i + 1}`,
          children: (
            <ProDescriptions
              key={i}
              column={3}
              dataSource={item || {}}
              columns={productItem({
                number: item.items && item.items.length,
              })}
            />
          ),
        };
      });
    }
    return [];
  }, [data]);

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

      <Card title="包裹信息" loading={loading}>
        {packageListItems.length > 0 ? (
          <Tabs
            destroyInactiveTabPane={true}
            items={packageListItems}
            size="small"
            defaultActiveKey={'1'}
          />
        ) : (
          <Empty />
        )}
      </Card>

      <Card title="商品信息">
        <Table
          columns={manageColumn}
          dataSource={queryData.items || []}
          rowKey="id"
          scroll={{ x: 1300 }}
        />
        <Typography.Text style={{ float: 'right', marginTop: 24 }}>
          商品总价：{queryData.totalPrice || '-'} 运费：￥0.00 优惠卷：￥0.00 订单金额：￥
          {queryData.orderPrice || '-'}
        </Typography.Text>
      </Card>
    </Space>
  );
}
