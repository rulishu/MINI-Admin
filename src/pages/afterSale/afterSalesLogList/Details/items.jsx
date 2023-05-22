import { Image } from 'antd';
import { auditStatusEnum } from '../enum';

export const basicItem = [
  {
    title: '订单编号',
    key: 'orderNumber',
    dataIndex: 'orderNumber',
    ellipsis: true,
  },
  {
    title: '卖家信息',
    key: 'companyName',
    dataIndex: 'companyName',
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
    key: 'buyerUserName',
    dataIndex: 'buyerUserName',
    ellipsis: true,
  },
];

export const detailItem = [
  {
    title: '下单时间',
    key: 'orderCreateTime',
    dataIndex: 'orderCreateTime',
    ellipsis: true,
  },
  {
    title: '付款时间',
    key: 'payDate',
    dataIndex: 'payDate',
    ellipsis: true,
  },
  {
    title: '开票状态',
    key: 'isOpenInvoice',
    dataIndex: 'isOpenInvoice',
    valueType: 'select',
    valueEnum: {
      1: {
        text: '已开票',
        status: 'Success',
      },
      0: {
        text: '未开票',
        status: 'Error',
      },
    },
  },
  {
    title: '售后申请原因',
    key: 'reason',
    dataIndex: 'reason',
    ellipsis: true,
  },
  {
    title: '售后问题描述',
    key: 'reasonInfo',
    dataIndex: 'reasonInfo',
    ellipsis: true,
  },
  // {
  //   title: '图片描述',
  //   key: 'text',
  //   dataIndex: 'text',
  //   ellipsis: true,
  // },
  {
    title: '售后审批状态',
    key: 'status',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: auditStatusEnum,
  },
];

export const columns = [
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
