import { useDispatch, useSelector } from '@umijs/max';
import { Tabs } from 'antd';
import Forms from './Forms';
import Tables from './Tables';

export default () => {
  const { tabs, showForm } = useSelector((state) => state.productManage);
  const dispatch = useDispatch();
  const items = [
    {
      key: 2,
      label: `标品商品`,
      children: <Tables />,
    },
    {
      key: 3,
      label: `封坛商品`,
      children: <Tables />,
    },
  ];
  const render = () => {
    if (showForm) {
      return <Forms />;
    }
    return (
      <Tabs
        activeKey={tabs}
        items={items}
        onChange={(key) => {
          dispatch({
            type: 'productManage/update',
            payload: {
              tabs: key,
            },
          });
        }}
      />
    );
  };
  return <div>{render()}</div>;
};
