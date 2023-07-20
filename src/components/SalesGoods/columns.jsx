import AImage from '@/components/AImage';
import { Divider, Typography } from 'antd';
import moment from 'moment';
import React from 'react';

export const columns = ({ handleEdit, disabled }) => [
  {
    title: '商品信息',
    dataIndex: 'item',
    width: 250,
    render: (_, record) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <AImage width={80} height={80} src={record?.mainGraph} />
          </div>
          <div style={{ width: 160, marginLeft: 8 }}>
            <div>{record?.itemName}</div>
            <Typography.Text ellipsis={{ tooltip: record.skuName }} style={{ color: '#ccc' }}>
              {record.skuName}
            </Typography.Text>
            <div style={{ padding: 0, margin: 0 }}>ID：{record?.id}</div>
          </div>
        </div>
      );
    },
  },
  {
    title: '售价',
    width: 150,
    dataIndex: 'price',
    key: 'price',
    render: (_, record) => {
      return <div>￥{record.price}</div>;
    },
  },
  {
    title: '折扣范围',
    dataIndex: 'discountRange',
    width: 150,
    key: 'discountRange',
  },
  {
    title: '活动总库存',
    width: 150,
    dataIndex: 'stockTotal',
    key: 'stockTotal',
  },
  {
    title: '操作',
    width: 200,
    align: 'left',
    render: (record) =>
      disabled ? null : (
        <div>
          <a onClick={() => handleEdit('set', record)}> 设置规格优惠</a>
          <Divider type="vertical" />
          <a onClick={() => handleEdit('delete', record)}>删除</a>
        </div>
      ),
  },
];

export const searchColumns = () => [
  {
    title: '商品信息',
    dataIndex: 'item',
    width: 250,
    render: (_, record) => {
      return (
        <React.Fragment>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <AImage width={80} height={80} src={record?.mainGraph} />
            </div>
            <div style={{ marginLeft: 8, flex: 1 }}>
              <div>{record?.itemName}</div>
              <div
                style={{ color: '#ccc', wordWrap: 'break-word', flexGrow: 1, textAlign: 'justify' }}
              >
                {record.skuName}
              </div>
              <div style={{ padding: 0, margin: 0 }}>ID：{record?.id}</div>
            </div>
          </div>
          {record.isActivityItem && <div style={{ color: 'red' }}>该商品该时段已参加秒杀活动</div>}
        </React.Fragment>
      );
    },
  },
  {
    title: '商品状态',
    dataIndex: 'onShelf',
    width: 80,
    render: (_, record) => {
      if (record?.groupType === 3) {
        return <span>仓库中</span>;
      }
      if (record?.onShelf === 2 && record?.groupType === 1) {
        return <span>待开售</span>;
      }
      if (record?.onShelf === 2 && record?.groupType === 2) {
        return <span>出售中</span>;
      }
    },
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 80,
    valueType: 'digit',
    render: (_, record) => <div>￥{record.price}</div>,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    hideInTable: true,
    width: 150,
    render: (_, record) =>
      (record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
  },
];
