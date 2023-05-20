import { Tabs } from 'antd';
import Level from './Level/Table';
import Product from './Product/Table';

const Index = () => {
  const onChange = () => {
    return console.log();
  };

  const items = [
    {
      key: '1',
      label: `等级收益`,
      children: <Level />,
    },
    {
      key: '2',
      label: `商品收益`,
      children: <Product />,
    },
  ];

  return (
    <div>
      <Tabs size="small" defaultActiveKey="1" onChange={onChange} type="card" items={items} />
    </div>
  );
};
export default Index;
