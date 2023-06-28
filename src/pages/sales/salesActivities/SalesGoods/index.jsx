import { App, Button, Space, Table } from 'antd';
import { Fragment, useState } from 'react';
import { columns } from './columns';
import SearchGoods from './searchGoods';

const Index = ({ value, onChange }) => {
  const { modal } = App.useApp();
  const [dataSource, setDataSource] = useState(value || []);
  const [visible, setVisible] = useState(false);

  const handleEdit = (type, record) => {
    if (type === 'delete') {
      modal.confirm({
        title: '温馨提醒',
        maskClosable: true,
        content: `确定是否要删除商品【${record.itemName}】？`,
        onOk: () => {
          const data = dataSource.filter((item) => item.id !== record.id);
          onChange?.(data);
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
      <SearchGoods {...{ dataSource, setDataSource, visible, setVisible, onChange }} />
    </Fragment>
  );
};

export default Index;
