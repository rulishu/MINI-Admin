import { useDispatch, useSelector } from '@umijs/max';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import Forms from './Forms';
import SKUModal from './SKUModal';
import Tables from './Tables';
import './index.less';

const App = () => {
  const { showForm, showSKU, activeKey } = useSelector((state) => state.productManage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'groupManage/getAllCategory',
    });
    // 类目tree
    dispatch({
      type: 'groupManage/getCategoryTree',
    });
    dispatch({
      type: 'productManage/selectAttr',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    {
      key: '4',
      label: `全部`,
      children: <Tables />,
    },
    {
      key: '3',
      label: `待开售`,
      children: <Tables />,
    },
    {
      key: '1',
      label: `出售中`,
      children: <Tables />,
    },
    {
      key: '2',
      label: `仓库中`,
      children: <Tables />,
    },
  ];
  if (showSKU) {
    return <SKUModal />;
  }
  if (showForm) {
    return <Forms />;
  }
  return (
    <Tabs
      activeKey={activeKey}
      items={items}
      size="small"
      onChange={(key) => {
        dispatch({
          type: 'productManage/update',
          payload: {
            activeKey: key,
          },
        });
      }}
    />
  );
};

export default App;
