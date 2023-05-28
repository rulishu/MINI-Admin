import { useDispatch, useSelector } from '@umijs/max';
import { Card, Tabs } from 'antd';
import Table from './Table';

const App = () => {
  const { activeKey } = useSelector((state) => state.bannerManage);
  const dispatch = useDispatch();
  const items = [
    {
      key: '1',
      label: `首页Banner`,
      children: <Table />,
    },
    {
      key: '2',
      label: `首页活动`,
      children: <Table />,
    },
  ];
  return (
    <Card>
      <Tabs
        activeKey={activeKey}
        items={items}
        size="small"
        onChange={(key) => {
          dispatch({
            type: 'bannerManage/update',
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
