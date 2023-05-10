import { Tabs } from 'antd';
import AuditSettings from './AuditSettings/Table';
import Level from './Level/Table';
import Relegation from './Relegation/Table';

const Index = () => {
  const onChange = () => {
    return console.log();
  };

  const items = [
    {
      key: '1',
      label: `等级审核`,
      children: <Level />,
    },
    {
      key: '2',
      label: `保级审核`,
      children: <Relegation />,
    },
    {
      key: '3',
      label: `审核设置`,
      children: <AuditSettings />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={onChange} items={items} />
    </div>
  );
};
export default Index;
