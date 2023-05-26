import { Image } from 'antd';
import { isOpenInvoiceEnum, orderStatusEnum } from '../enum';

export const basicItem = [
  {
    title: '订单编号',
    key: 'orderNumber',
    dataIndex: 'orderNumber',
    ellipsis: true,
  },
  {
    title: '卖家信息',
    key: 'userName',
    dataIndex: 'userName',
    ellipsis: true,
  },
  {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone',
    ellipsis: true,
  },
  {
    title: '买家信息',
    key: 'consignee',
    dataIndex: 'consignee',
    ellipsis: true,
  },
];

export const manageItem = [
  {
    title: '下单时间',
    key: 'createTime',
    dataIndex: 'createTime',
    ellipsis: true,
  },
  {
    title: '订单状态',
    key: 'orderStatus',
    dataIndex: 'orderStatus',
    valueType: 'select',
    valueEnum: orderStatusEnum,
  },
  {
    title: '收货人',
    key: 'consignee',
    dataIndex: 'consignee',
    ellipsis: true,
  },
  {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone',
    ellipsis: true,
  },
  {
    title: '收货地址',
    key: 'address',
    dataIndex: 'address',
    ellipsis: true,
  },
  {
    title: '快递单号',
    key: 'trackingNumber',
    dataIndex: 'trackingNumber',
    ellipsis: true,
  },
  {
    title: '物流公司',
    key: 'companyName',
    dataIndex: 'companyName',
    ellipsis: true,
  },
  {
    title: '开票状态',
    key: 'isOpenInvoice',
    dataIndex: 'isOpenInvoice',
    valueType: 'select',
    valueEnum: isOpenInvoiceEnum,
  },
];

export const manageColumn = [
  {
    title: '商品图片',
    dataIndex: 'mainGraph',
    key: 'mainGraph',

    ellipsis: true,
    width: 80,
    render: (value) => {
      return <Image src={value} preview={{ src: value }} />;
    },
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    key: 'itemName',

    ellipsis: true,
    width: 80,
  },
  {
    title: '规格',
    dataIndex: 'specifications',
    key: 'specifications',

    ellipsis: true,
    width: 80,
  },
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',

    ellipsis: true,
    width: 80,
  },
  {
    title: '数量',
    dataIndex: 'amount',
    key: 'amount',

    ellipsis: true,
    width: 80,
  },
  {
    title: '商品价格',
    dataIndex: 'unitPrice',
    key: 'unitPrice',

    ellipsis: true,
    width: 80,
  },
  {
    title: '运费',
    dataIndex: 'name',
    key: 'name',

    ellipsis: true,
    width: 80,
  },
];
