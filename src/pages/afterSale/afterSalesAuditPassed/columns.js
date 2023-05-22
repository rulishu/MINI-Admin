import { Divider } from 'antd';
import React from 'react';
import { refundStatusEnum } from './enum';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',

    ellipsis: true,
    width: 80,
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '公司名称',
    dataIndex: 'itemName',

    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',

    ellipsis: true,
    width: 80,
  },
  {
    title: '商品金额',
    dataIndex: 'orderPrice',

    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '商品数量',
    dataIndex: 'sum',

    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '售后申请时间',
    dataIndex: 'searchTime',

    ellipsis: true,
    valueType: 'date',
    width: 150,
    hideInTable: true,
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',

    ellipsis: true,
    valueType: 'date',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '退款状态',
    dataIndex: 'refundStatus',

    ellipsis: true,
    width: 150,
    valueType: 'select',
    valueEnum: refundStatusEnum,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 120,

    hideInSearch: true,
    render: (record) => {
      const { refundStatus } = record;
      return (
        <div>
          <a onClick={() => handleEdit('view', record)}>详情</a>
          <Divider type="vertical" />
          <a onClick={() => handleEdit('refundDetails', record)}>退款详情</a>
          {!refundStatus && (
            <React.Fragment>
              <Divider type="vertical" />
              <a onClick={() => handleEdit('refund', record)}>退款</a>
            </React.Fragment>
          )}
        </div>
      );
    },
  },
];
