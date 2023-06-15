import { useDispatch, useSelector } from '@umijs/max';
import { Card, Tabs } from 'antd';
import { useEffect } from 'react';
import Table from './Table';

const App = () => {
  const { activeKey, count } = useSelector((state) => state.orderManage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'orderManage/getLogisticsCompany',
    });
    dispatch({
      type: 'orderManage/getOrderCount',
    });
  }, []);
  const items = [
    {
      key: 1,
      label: `待付款(${count.awaiting || 0})`,
      children: <Table />,
    },
    {
      key: 2,
      label: `备货中(${count.inStock || 0})`,
      children: <Table />,
    },
    {
      key: 3,
      label: `待收货(${count.received || 0})`,
      children: <Table />,
    },
    {
      key: '售后中',
      label: `售后中(${count.afterSales || 0})`,
      children: <Table />,
    },
    {
      key: 4,
      label: `已完成`,
      children: <Table />,
    },
    {
      key: -2,
      label: `已关闭`,
      children: <Table />,
    },
  ];
  return (
    <Card bodyStyle={{ padding: 12 }}>
      <Tabs
        destroyInactiveTabPane={true}
        activeKey={activeKey}
        items={items}
        size="small"
        onChange={(key) => {
          dispatch({
            type: 'orderManage/update',
            payload: {
              activeKey: key,
            },
          });
        }}
      />
    </Card>
  );
};

export default App;
