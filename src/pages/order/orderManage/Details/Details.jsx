import { ProDescriptions } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card, Empty, Modal, Space, Table, Tabs, Typography } from 'antd';
import { useMemo } from 'react';
import { basicItem, buyerItem, manageColumn, productItem, receiveItem } from './items';

export default function Edit({ reload }) {
  const dispatch = useDispatch();
  const {
    orderManage: { queryData, pushList, visible },
    loading: loading,
  } = useSelector((state) => state);

  const updateFn = (payload) => {
    dispatch({
      type: 'orderManage/update',
      payload: payload,
    });
  };

  const handleCancel = () => {
    updateFn({ visible: false });
    reload?.();
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
    <Modal
      open={visible}
      destroyOnClose
      closable={false}
      width={1250}
      onCancel={handleCancel}
      footer={
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>
      }
    >
      <div style={{ maxWidth: 1200, overflow: 'auto' }}>
        <Space direction="vertical">
          <Card title="订单信息" loading={loading.effects['orderManage/selectById']}>
            <ProDescriptions
              editable={{
                onSave: async (keypath, newInfo) => {
                  const value = newInfo[keypath];
                  updateFn({ queryData: { ...queryData, [keypath]: value } });
                  dispatch({
                    type: 'orderManage/updateInfo',
                    payload: {
                      [keypath]: value,
                      id: queryData.id,
                    },
                  });
                  return true;
                },
              }}
              column={{ xs: 1, sm: 2, md: 3, lg: 4 }}
              dataSource={queryData}
              columns={basicItem}
            />
          </Card>

          <Card loading={loading.effects['orderManage/selectById']}>
            <ProDescriptions
              title="买家信息"
              column={{ xs: 1, sm: 2, md: 3, lg: 4 }}
              dataSource={queryData}
              columns={buyerItem}
            />
            <ProDescriptions
              title="收货信息"
              column={{ xs: 1, sm: 2, md: 3, lg: 4 }}
              dataSource={queryData}
              columns={receiveItem}
            />
          </Card>

          <Card title="包裹信息" loading={loading.effects['orderManage/getInfoPushList']}>
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

          <Card title="商品信息" loading={loading.effects['orderManage/selectById']}>
            <Table columns={manageColumn} dataSource={queryData.items || []} rowKey="id" />
            <Typography.Text style={{ float: 'right', marginTop: 24 }}>
              商品总价：<span style={{ color: '#1677ff' }}>￥{queryData.orderPrice || '-'} </span>
              运费：
              <span style={{ color: '#1677ff' }}>￥0.00</span> 优惠卷：
              <span style={{ color: '#1677ff' }}>￥0.00</span> 订单金额：
              <span style={{ color: '#1677ff' }}>￥{queryData.orderPrice || '-'} </span>
            </Typography.Text>
          </Card>
        </Space>
      </div>
    </Modal>
  );
}
