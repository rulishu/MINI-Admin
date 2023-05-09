import { useModel } from '@umijs/max';
import { Tabs } from 'antd';

export default function Page() {
  const { store, setStore } = useModel('shareManage', (model) => ({
    ...model,
  }));
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
  return (
    <Tabs
      activeKey={store.tab}
      items={items}
      onChange={(key) => setStore({ ...store, tab: key })}
    />
  );
}
