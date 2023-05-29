import { Table } from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const ConnectTable = ({ tableRef, scrollY }) => {
  return (
    <Table
      ref={tableRef}
      style={{ width: '100%', height: '100%', minHeight: 714, overflow: 'auto' }}
      columns={columns}
      dataSource={data}
      bordered
      scroll={{
        x: '100%',
        y: scrollY,
      }}
      sticky
    />
  );
};
export default ConnectTable;

const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Action',
    key: 'operation',
    width: 100,
    fixed: 'right',
    render: () => <a>delete</a>,
  },
];
