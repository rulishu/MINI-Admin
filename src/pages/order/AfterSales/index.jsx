import { useDispatch, useSelector } from '@umijs/max';
import { Card, Tabs } from 'antd';
import Table from './Table';

const App = () => {
  const dispatch = useDispatch();
  const { activeKey } = useSelector((state) => state.aftersales);

  return (
    <Card>
      <Tabs
        size="small"
        defaultActiveKey="1"
        activeKey={activeKey}
        destroyInactiveTabPane
        items={items}
        onChange={(key) => {
          dispatch({
            type: 'aftersales/update',
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

const items = [
  {
    key: '1',
    label: `待审核`,
    children: <Table key="1" />,
  },
  {
    key: '2',
    label: `退款中`,
    children: <Table key="2" />,
  },
  {
    key: '3',
    label: `待买家退货`,
    children: <Table key="3" />,
  },
  {
    key: '4',
    label: `待平台收货`,
    children: <Table key="4" />,
  },
  {
    key: '5',
    label: `已拒绝售后`,
    children: <Table key="5" />,
  },
  {
    key: '6',
    label: `退货后平台拒绝`,
    children: <Table key="6" />,
  },
  {
    key: '7',
    label: `已取消`,
    children: <Table key="7" />,
  },
  {
    key: '8',
    label: `已退款`,
    children: <Table key="8" />,
  },
];
