import { Image, InputNumber, Space, Table } from 'antd';
import { Fragment, useEffect, useState } from 'react';

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
                  <b style={{ fontSize: '14px' }}>{record.itemName}</b>
                  <div style={{ fontSize: '14px', color: '#ccc' }}>
                    {(record.attributes || []).map((item, i) => (
                      <Fragment key={item.attributeId}>
                        <span> {`${item.attributeName}:${item.value}`}</span>
                        {i !== (record.attributes || []).length - 1 && <span>;</span>}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Space>
            ),
          },
          {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount',
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
                  min={0}
                  max={record.amount}
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
