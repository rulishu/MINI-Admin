import { InputNumber, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { shipmentsStatusEnum } from '../enum';
import { GoodInfoComp } from './index';

// eslint-disable-next-line no-unused-vars
export default ({ value = [], onChange, ...others }) => {
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
    getCheckboxProps: (record) => ({
      disabled: record.shipmentsStatus === 2,
    }),
  };

  return (
    <div style={{ width: '100%' }}>
      <Table
        {...others}
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
            render: (_, record) => <GoodInfoComp record={record} />,
          },
          {
            title: '购买数量',
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
          },
          {
            title: '发货状态',
            dataIndex: 'shipmentsStatus',
            key: 'shipmentsStatus',
            width: 120,
            render: (_, record) => {
              const obj = shipmentsStatusEnum[record.shipmentsStatus] || {};
              return (
                obj && (
                  <Tag color={obj.status}>
                    {record.shipmentsStatus === 1
                      ? `${record.shipmentAcount}/${record.amount}已发货`
                      : obj.text}
                  </Tag>
                )
              );
            },
          },
          {
            title: '发货数量',
            dataIndex: 'number',
            key: 'number',
            render: (_, record) => {
              return (
                <InputNumber
                  disabled={record.shipmentsStatus === 2}
                  value={record.number}
                  defaultValue={record.number}
                  min={0}
                  max={Math.max(record.amount - record.shipmentAcount, 0)}
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
