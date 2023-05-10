import { Tabs } from 'antd';
import AuditSettings from './auditSettings/auditSettings';
import LevelReview from './levelReview/levelReview';
import RelegationReview from './relegationReview/relegationReview';

const Index = () => {
  const onChange = () => {
    return console.log();
  };

  const items = [
    {
      key: '1',
      label: `等级审核`,
      children: <LevelReview />,
    },
    {
      key: '2',
      label: `保级审核`,
      children: <RelegationReview />,
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
