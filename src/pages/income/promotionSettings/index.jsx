import { Alert, Row, Space, Tabs } from 'antd';
import IncomeSetting from './IncomeSetting';

const Index = () => {
  const text = (
    <div>
      <span style={{ color: '#31708F', fontWeight: 'bold' }}>
        提示!营销推广防范封号,切忌大量高频出现“提成”,“分佣”等敏感词,极限用语“最高级”,“国家级”等，违反广告法条例的广告行为。
      </span>
    </div>
  );
  const onChange = () => {};
  const items = [
    {
      key: '1',
      label: `推广收益配置`,
      children: <IncomeSetting />,
    },
    // {
    //   key: '2',
    //   label: `保级审核`,
    //   children: <Relegation />,
    // },
    // {
    //   key: '3',
    //   label: `审核设置`,
    //   children: <AuditSettings />,
    // },
  ];
  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: 10 }}>
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Alert message={text} type="info" closable />
        </Space>
      </Row>
      <Tabs defaultActiveKey="1" type="card" onChange={onChange} items={items} />
    </div>
  );
};
export default Index;
