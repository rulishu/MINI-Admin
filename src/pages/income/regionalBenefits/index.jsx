import { Tabs } from 'antd';
import Config from './Config';
import LevelTables from './LevelTables';
import ProductTable from './ProductTable';
import Records from './Records';
import Tables from './Tables';

const giftPackManagement = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: `区域收益`,
      children: <Tables />,
    },
    {
      key: '2',
      label: `区域商品收益`,
      children: <ProductTable />,
    },
    {
      key: '3',
      label: `区域级差收益`,
      children: <LevelTables />,
    },
    {
      key: '4',
      label: `区域级差商品收益`,
      children: <ProductTable />,
    },
    {
      key: '5',
      label: `区域收益配置`,
      children: <Config />,
    },
    {
      key: '6',
      label: `区域收益记录`,
      children: <Records />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};
export default giftPackManagement;
