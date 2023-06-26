import { ProCard } from '@ant-design/pro-components';
import { Table } from 'antd';
import { profitSharingColumns } from './items';

export default () => {
  return (
    <ProCard title="订单编号：123456789" headerBordered>
      <Table
        scroll={{ x: 1300 }}
        columns={profitSharingColumns}
        dataSource={[{ id: 1 }]}
        rowKey="id"
        pagination={false}
      />
    </ProCard>
  );
};
