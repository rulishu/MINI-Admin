import { Tabs } from 'antd';
import LevelIncome from './levelIncome/levelIncome';
import ProductIncome from './productIncome/productIncome';

const Index = () => {
  const onChange = () => {
    return console.log();
  };

  const items = [
    {
      key: '1',
      label: `等级收益`,
      children: <LevelIncome />,
    },
    {
      key: '2',
      label: `商品收益`,
      children: <ProductIncome />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={onChange} type="card" items={items} />
    </div>
  );
};
export default Index;
