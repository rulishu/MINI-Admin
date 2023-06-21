import { App, Button, Space, Table } from 'antd';
import { Fragment, useState } from 'react';
import { columns } from './columns';
import SearchGoods from './searchGoods';

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const { modal } = App.useApp();
  const handleEdit = (type, record) => {
    if (type === 'delete') {
      modal.confirm({
        title: '温馨提醒',
        maskClosable: true,
        content: `确定是否要删除商品【${record.itemName}】？`,
        onOk: () => {
          const data = dataSource.filter((item) => item.id !== record.id);
          setDataSource([...data]);
        },
      });
    }
  };
  return (
    <Fragment>
      <Space direction="vertical">
        <Button type="primary" onClick={() => setVisible(true)}>
          添加商品
        </Button>
        <Table dataSource={dataSource} columns={columns({ handleEdit })} rowKey="id" />
      </Space>
      <SearchGoods
        visible={visible}
        close={() => setVisible(false)}
        setDataSource={setDataSource}
        data={dataSource}
      />
    </Fragment>
  );
};
