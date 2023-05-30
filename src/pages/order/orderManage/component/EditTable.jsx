import { Image, InputNumber, Space, Table } from 'antd';
import { useEffect, useState } from 'react';

// eslint-disable-next-line no-unused-vars
export default ({ value = [], onChange }) => {
  const [defaultValue, setDefaultValue] = useState(value);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);

  useEffect(() => {
    onChange?.(selectedRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows]);

  const handleNumberChange = (id, number) => {
    const newDefaultValue = defaultValue.map((item) => {
      if (item.id === id) {
        return { ...item, number };
      } else {
        return item;
      }
    });
    const newSelectedRows = selectedRows.map((item) => {
      if (item.id === id) {
        return { ...item, number };
      } else {
        return item;
      }
    });
    setDefaultValue(newDefaultValue);
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    selectedRows: selectedRows,
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      setselectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div style={{ width: '100%' }}>
      <Table
        pagination={false}
        rowKey="id"
        dataSource={defaultValue}
        rowSelection={{
          ...rowSelection,
        }}
        columns={[
          {
            title: '商品信息',
            dataIndex: 'date',
            key: 'date',
            render: (_, record) => (
              <Space>
                <Image height={80} width={80} src={record.mainGraph} />
                <div>
                  <b style={{ fontSize: '16px' }}>乔宣咖啡 挂耳咖啡礼盒 10g*7包</b>
                  <div style={{ fontSize: '14px', color: '#ccc' }}>规格值1，规格值2</div>
                </div>
              </Space>
            ),
          },
          {
            title: '数量',
            dataIndex: 'num',
            key: 'num',
          },
          {
            title: '发货状态',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: '发货数量',
            dataIndex: 'number',
            key: 'number',
            render: (_, record) => {
              return (
                <InputNumber
                  value={record.number}
                  onChange={(value) => handleNumberChange(record.id, value)}
                />
              );
            },
          },
        ]}
      />
    </div>
  );
};
