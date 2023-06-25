import { App, Button, Space, Table } from 'antd';
import { Fragment, useContext } from 'react';
import { columns } from './columns';
import { Context, Provider } from './hooks/context';
import SearchGoods from './searchGoods';
import SetGoods from './setGoods';

const Index = () => {
  const {
    state: { dataSource },
    dispatch,
  } = useContext(Context);
  const { modal } = App.useApp();

  const handleEdit = (type, record) => {
    if (type === 'delete') {
      modal.confirm({
        title: '温馨提醒',
        maskClosable: true,
        content: `确定是否要删除商品【${record.itemName}】？`,
        onOk: () => {
          const data = dataSource.filter((item) => item.id !== record.id);
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
        <Table dataSource={dataSource} columns={columns({ handleEdit })} rowKey="id" />
      </Space>
      <SearchGoods />
      <SetGoods />
    </Fragment>
  );
};

export default () => {
  return (
    <Provider>
      <Index />
    </Provider>
  );
};
