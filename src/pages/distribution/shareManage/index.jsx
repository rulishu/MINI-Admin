import { Tabs } from 'antd';
import { useState } from 'react';

export default function Page() {
  const [tab, setTab] = useState('tab1');
  const items = [
    {
      label: `待生效`,
      key: 'tab1',
      children: '待生效',
    },
    {
      label: `生效中`,
      key: 'tab2',
      children: '生效中',
    },
    {
      label: `已作废`,
      key: 'tab3',
      children: '已作废',
    },
  ];
  return <Tabs activeKey={tab} size="small" items={items} onChange={(key) => setTab(key)} />;
}
