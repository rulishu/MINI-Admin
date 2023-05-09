import { Tabs } from 'antd';
import Tables from './Tables';
import GiftTables from './GiftTables'
import BasicsTables from './BasicsTables'

const GiftPackManagement = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: `店长收益配置`,
      children: <Tables />,
    },
    {
      key: '2',
      label: `店长礼包配置`,
      children: <GiftTables />,
    },
    {
      key: '3',
      label: `基础配置`,
      children: <BasicsTables />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="2" items={items} onChange={onChange} />
    </div>
  );
};
export default GiftPackManagement;
