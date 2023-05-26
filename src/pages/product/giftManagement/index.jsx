import { Tabs } from 'antd';
import Tables from './Tables';

const giftManagement = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: `标品商品`,
      children: <Tables />,
    },
    {
      key: '2',
      label: `封坛商品`,
      children: <Tables />,
    },
  ];
  return <Tabs size="small" defaultActiveKey="1" items={items} onChange={onChange} />;
};
export default giftManagement;
