import { useUnmount } from 'ahooks';
import { App, Button, Space, Table } from 'antd';
import { Fragment, useContext, useEffect } from 'react';
import { columns } from './columns';
import { Context, Provider } from './hooks/context';
import SearchGoods from './searchGoods';
import SetGoods from './setGoods';

const Index = () => {
  const {
    state: { dataSource },
    dispatch,
    value,
    onChange,
    addons,
  } = useContext(Context);
  const { modal } = App.useApp();

  useEffect(() => {
    if (addons && addons.removeErrorField && addons.dataPath) {
      addons.removeErrorField(addons.dataPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, addons]);

  useUnmount(() => {
    if (addons && addons.removeErrorField && addons.dataPath) {
      addons.removeErrorField(addons.dataPath);
    }
  });

  const handleEdit = (type, record) => {
    if (type === 'delete') {
      modal.confirm({
        title: '温馨提醒',
        maskClosable: true,
        content: `确定是否要删除商品【${record.itemName}】？`,
        onOk: () => {
          const data = dataSource.filter((item) => item.id !== record.id);
          onChange?.(data);
          dispatch({ dataSource: [...data] });
        },
      });
    }
    if (type === 'set') {
      dispatch({ setVisible: true, setRecord: { ...record } });
    }
  };
  return (
    <Fragment>
      <Space direction="vertical">
        <Button type="primary" onClick={() => dispatch({ visible: true })}>
          添加商品
        </Button>
        {dataSource && dataSource.length > 0 && (
          <Table
            dataSource={dataSource}
            columns={columns({ handleEdit })}
            rowKey="id"
            pagination={{
              showTotal: (total) => `共 ${total} 条数据`,
            }}
          />
        )}
      </Space>
      <SearchGoods />
      <SetGoods />
    </Fragment>
  );
};

export default ({ value = [], ...props }) => {
  const defaultProps = { value, ...props };
  return (
    <Provider defaultProps={defaultProps}>
      <Index />
    </Provider>
  );
};
