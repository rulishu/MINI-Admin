import { Divider } from 'antd';
import { Fragment } from 'react';
import { isOpenInvoiceEnum, orderStatusEnum } from './enum';

export const columns = (handle) => [
  {
    title: 'ID',
    dataIndex: 'id',

    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
  },
  {
    title: '数量',
    dataIndex: 'itemCount',

    hideInSearch: true,
  },
  {
    title: '订单金额',
    dataIndex: 'orderPrice',

    hideInSearch: true,
  },
  {
    title: '收货人',
    dataIndex: 'consignee',
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',

    valueType: 'select',
    valueEnum: orderStatusEnum,
  },
  {
    title: '开票状态',
    dataIndex: 'isOpenInvoice',

    valueType: 'select',
    hideInSearch: true,
    valueEnum: isOpenInvoiceEnum,
  },
  {
    title: '操作',
    width: 150,
    fixed: 'right',

    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handle('view', record)}>详情</a>

        {record.orderStatus === 2 && (
          <Fragment>
            <Divider type="vertical" />
            <a onClick={() => handle('upOrder', record)}>上传单号</a>
          </Fragment>
        )}
      </div>
    ),
  },
];
