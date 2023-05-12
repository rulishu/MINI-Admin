import { useModel } from '@umijs/max';
import { Tabs } from 'antd';
import { useMemo } from 'react';
import Forms from './Forms';
import Tables from './Tables';

export default () => {
  const {
    store: { showForm, tabs },
    update,
  } = useModel('productManage', (model) => ({ ...model }));

  const onChange = (key) => update({ tabs: key });

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
  const render = useMemo(() => {
    if (showForm) {
      return <Forms />;
    }
    return <Tabs activeKey={tabs} items={items} onChange={onChange} />;
  }, [showForm]);
  return <div> {render}</div>;
};
