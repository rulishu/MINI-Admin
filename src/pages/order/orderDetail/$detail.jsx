import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Empty, Space, Table, Tabs, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { basicItem, buyerItem, manageColumn, productItem, receiveItem } from './items';

export default () => {
  const dispatch = useDispatch();
  const {
    orderDetail: { queryData, pushList },
    loading: loading,
  } = useSelector((state) => state);

  useEffect(() => {
    const id = localStorage.getItem('orderDetailId');
    dispatch({ type: 'orderDetail/selectById', payload: { id: id } });
  }, []);

  const updateFn = (payload) => {
    dispatch({
      type: 'orderDetail/update',
      payload: payload,
    });
  };

  const packageListItems = useMemo(() => {
    if (pushList.length > 0) {
      return pushList.map((item, i) => {
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
  }, [pushList]);

  return (
    <Space direction="vertical">
      <Card title="订单信息" loading={loading.effects['orderDetail/selectById']}>
        <ProDescriptions
          editable={{
            onSave: async (keypath, newInfo) => {
              const value = newInfo[keypath];
              updateFn({ queryData: { ...queryData, [keypath]: value } });
              dispatch({
                type: 'orderDetail/updateInfo',
                payload: {
                  [keypath]: value,
                  id: queryData.id,
                },
              });
              return true;
            },
          }}
          column={4}
          dataSource={queryData}
          columns={basicItem}
        />
      </Card>

      <Card loading={loading.effects['orderDetail/selectById']}>
        <ProDescriptions title="买家信息" column={4} dataSource={queryData} columns={buyerItem} />
        <ProDescriptions title="收货信息" column={4} dataSource={queryData} columns={receiveItem} />
      </Card>

      <Card title="包裹信息" loading={loading.effects['orderDetail/getInfoPushList']}>
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

      <Card title="商品信息" loading={loading.effects['orderDetail/selectById']}>
        <Table columns={manageColumn} dataSource={queryData.items || []} rowKey="id" />
        <Typography.Text style={{ float: 'right', marginTop: 24 }}>
          商品总价：<span style={{ color: '#1677ff' }}>￥{queryData.orderPrice || '-'} </span>运费：
          <span style={{ color: '#1677ff' }}>￥0.00</span> 优惠卷：
          <span style={{ color: '#1677ff' }}>￥0.00</span> 订单金额：
          <span style={{ color: '#1677ff' }}>￥{queryData.orderPrice || '-'} </span>
        </Typography.Text>
      </Card>
    </Space>
  );
};
