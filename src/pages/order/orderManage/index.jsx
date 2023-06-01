import { useDispatch, useSelector } from '@umijs/max';
import { Card, Tabs } from 'antd';
import Details from './Details/Details';
import Table from './Table';

const App = () => {
  const { activeKey, visible } = useSelector((state) => state.orderManage);
  const dispatch = useDispatch();
  const items = [
    {
      key: 1,
      label: `待付款`,
      children: <Table />,
    },
    {
      key: 2,
      label: `备货中`,
      children: <Table />,
    },
    {
      key: 3,
      label: `待收货`,
      children: <Table />,
    },
    {
      key: '售后中',
      label: `售后中`,
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
  if (visible) {
    return <Details />;
  }
  return (
    <Card>
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
