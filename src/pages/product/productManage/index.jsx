import { useModel } from '@umijs/max';
import { Tabs } from 'antd';
import Forms from './Forms';
import Tables from './Tables';

export default () => {
  const {
    store: { showForm },
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
  return (
    <div>
      {showForm ? <Forms /> : <Tabs defaultActiveKey="2" items={items} onChange={onChange} />}
    </div>
  );
};
