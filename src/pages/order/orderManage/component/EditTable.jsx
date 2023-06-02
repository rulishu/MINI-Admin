import { Image, InputNumber, Space, Table, Tag } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { shipmentsStatusEnum } from '../enum';

// eslint-disable-next-line no-unused-vars
export default ({ value = [], onChange }) => {
  const [defaultValue, setDefaultValue] = useState(value);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);

  useEffect(() => {
    onChange?.(selectedRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows]);

  const handleNumberChange = (id, amount) => {
    const newDefaultValue = defaultValue.map((item) => {
      if (item.id === id) {
        return { ...item, amount };
      } else {
        return item;
      }
    });
    const newSelectedRows = selectedRows.map((item) => {
      if (item.id === id) {
        return { ...item, amount };
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
            title: '购买数量',
            dataIndex: 'totelAmount',
            key: 'totelAmount',
          },
          {
            title: '发货状态',
            dataIndex: 'shipmentsStatus',
            key: 'shipmentsStatus',
            render: (_, record) => {
              const obj = shipmentsStatusEnum[record.shipmentsStatus] || {};
              return obj && <Tag color={obj.status}>{obj.text}</Tag>;
            },
          },
          {
            title: '发货数量',
            dataIndex: 'amount',
            key: 'amount',
            render: (_, record) => {
              return (
                <InputNumber
                  disabled={record.shipmentsStatus === 2}
                  value={record.amount}
                  defaultValue={0}
                  min={0}
                  max={Math.max(record.totelAmount - record.shipmentAcount, 0)}
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
