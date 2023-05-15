import { isOpenInvoiceEnum, orderStatusEnum } from './enum';

export const columns = (handle) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    align: 'center',
  },
  {
    title: '快递单号',
    dataIndex: 'trackingNumber',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '下单时间',
    dataIndex: 'createTime',
    align: 'center',
    valueType: 'date',
  },
  {
    title: '收货人',
    dataIndex: 'consignee',
    align: 'center',
  },
  {
    title: '数量',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单金额',
    dataIndex: 'orderPrice',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    align: 'center',
    valueType: 'select',
    valueEnum: orderStatusEnum,
  },
  {
    title: '开票状态',
    dataIndex: 'isOpenInvoice',
    align: 'center',
    valueType: 'select',
    valueEnum: isOpenInvoiceEnum,
  },
  {
    title: '操作',
    width: 100,
    fixed: 'right',
    align: 'center',
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
