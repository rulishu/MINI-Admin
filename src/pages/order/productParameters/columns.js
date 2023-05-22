import { Divider } from 'antd';
import React from 'react';

export const columns = ({ activeKey }) => [
  {
    title: '商品名称',
    dataIndex: 'key1',
    hideInTable: true,
  },
  {
    title: '商品分组',
    dataIndex: 'key2',
    hideInTable: true,
  },
  {
    title: '订单编号',
    dataIndex: 'id',
    fixed: 'left',
    width: 120,
  },
  {
    title: '商品',
    dataIndex: 'type',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '距启封天数',
    dataIndex: 'day',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '已支付金额',
    dataIndex: 'moneny',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '封坛数量',
    dataIndex: 'number',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '封坛期限(月/坛)',
    dataIndex: 'month',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '客户名称',
    dataIndex: 'custName',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '手机号码',
    dataIndex: 'phone',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '收获地址',
    dataIndex: 'address',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 150,
    fixed: 'right',

    hideInSearch: true,
    render: () => (
      <div>
        {activeKey === 'tab1' && (
          <a type="link" size="small">
            预告
          </a>
        )}
        {activeKey === 'tab2' && (
          <React.Fragment>
            <a type="link" size="small">
              直播
            </a>
            <Divider type="vertical" />
            <a type="link" size="small">
              启封
            </a>
          </React.Fragment>
        )}

        {activeKey === 'tab3' && (
          <a type="link" size="small">
            发货
          </a>
        )}

        {activeKey === 'tab4' && (
          <a type="link" size="small">
            快递信息
          </a>
        )}
        <Divider type="vertical" />
        <a type="link" size="small">
          查看
        </a>
      </div>
    ),
  },
];
