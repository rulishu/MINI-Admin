import { Divider } from 'antd';
import React from 'react';
import { refundStatusEnum } from './enum';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '公司名称',
    dataIndex: 'itemName',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    align: 'center',
    ellipsis: true,
    width: 80,
  },
  {
    title: '商品金额',
    dataIndex: 'orderPrice',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '商品数量',
    dataIndex: 'sum',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '售后申请时间',
    dataIndex: 'searchTime',
    align: 'center',
    ellipsis: true,
    valueType: 'date',
    width: 150,
    hideInTable: true,
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    valueType: 'date',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '退款状态',
    dataIndex: 'refundStatus',
    align: 'center',
    ellipsis: true,
    width: 150,
    valueType: 'select',
    valueEnum: refundStatusEnum,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
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
