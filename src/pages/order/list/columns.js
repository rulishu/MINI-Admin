import { isOpenInvoiceEnum, orderStatusEnum } from './enum';

export const columns = (handle) => [
  {
    title: 'ID',
    dataIndex: 'id',

    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',

    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
  },
  {
    title: '快递单号',
    dataIndex: 'trackingNumber',

    hideInSearch: true,
  },
  {
    title: '下单时间',
    dataIndex: 'createTime',

    valueType: 'date',
  },
  {
    title: '收货人',
    dataIndex: 'consignee',
  },
  {
    title: '数量',
    dataIndex: 'id',

    hideInSearch: true,
  },
  {
    title: '订单金额',
    dataIndex: 'orderPrice',

    hideInSearch: true,
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
    valueEnum: isOpenInvoiceEnum,
  },
  {
    title: '操作',
    width: 100,
    fixed: 'right',

    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handle('view', record)}>
          详情
        </a>
      </div>
    ),
  },
];
