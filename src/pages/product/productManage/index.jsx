import { useDispatch, useSelector } from '@umijs/max';
import { Card, Tabs } from 'antd';
import { useEffect } from 'react';
import Forms from './Forms';
import Tables from './Tables';
import './index.less';

const App = () => {
  const { showForm, activeKey } = useSelector((state) => state.productManage);
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
    dispatch({
      type: 'productManage/getAllTemplateId',
    });

    dispatch({
      type: 'supplier/getAllSuppliers',
    });
    dispatch({ type: 'commonInterface/getTreeList' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    {
      key: '4',
      label: `全部`,
      children: <Tables key="4" />,
    },
    {
      key: '3',
      label: `待开售`,
      children: <Tables key="3" />,
    },
    {
      key: '1',
      label: `出售中`,
      children: <Tables key="1" />,
    },
    {
      key: '2',
      label: `仓库中`,
      children: <Tables key="2" />,
    },
  ];
  if (showForm) {
    return <Forms />;
  }
  return (
    <Card>
      <Tabs
        destroyInactiveTabPane={true}
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
    </Card>
  );
};

export default App;
