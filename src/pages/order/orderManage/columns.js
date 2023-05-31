import UserContent from '@/components/UserContent';
import { Divider, Image, Space, Tag } from 'antd';
import moment from 'moment';
import { afterSaleStatusEnum, orderStatusEnum } from './enum';

export const columns = ({ handle }) => [
  {
    title: '用户',
    dataIndex: 'keyword',
    fieldProps: {
      placeholder: '请输入用户昵称/用户编号/注册号码',
    },
    hideInTable: true,
  },
  {
    title: '订单编号',
    width: 120,
    dataIndex: 'orderNumber',
    fieldProps: {},
  },
  {
    title: '下单时间',
    dataIndex: 'startTime',
    fieldProps: {
      showTime: true,
    },
    hideInTable: true,
    valueType: 'dateRange',
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    fieldProps: {},
    hideInTable: true,
  },
  {
    title: '供应商',
    dataIndex: 'supplierName',
    fieldProps: {},
    hideInTable: true,
  },
  {
    title: '物流单号',
    dataIndex: 'trackingNumber',
    fieldProps: {},
    hideInTable: true,
  },
  {
    title: '下单时间',
    width: 180,
    dataIndex: 'createTime',
    hideInSearch: true,
    render: (_, record) =>
      (record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
  },
  {
    title: '用户信息',
    width: 200,
    dataIndex: 'user',
    hideInSearch: true,
    render: (_, record) => (
      <UserContent headUrl={''} name={record.userName} phone={record.userMobile} />
    ),
  },
  {
    title: '订单金额',
    width: 120,
    hideInSearch: true,
    render: (_, record) => <div>￥{record.orderPrice}</div>,
  },
  {
    title: '收件信息',
    width: 200,
    dataIndex: 'upgradeNum',
    hideInSearch: true,
    render: (_, record) => {
      const { consignee, phone, receivingAddress } = record.orderLogisticsDto || {};
      return (
        <Space>
          <div>
            <b style={{ fontSize: '16px' }}>
              {consignee || '-'} {phone || '-'}
            </b>
            <div style={{ fontSize: '14px' }}>{receivingAddress || '-'}</div>
          </div>
        </Space>
      );
    },
  },
  {
    title: '订单备注',
    dataIndex: 'remark',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '订单状态',
    width: 90,
    dataIndex: 'orderStatus',
    hideInSearch: true,
    render: (_, record) => {
      const obj = String(record.orderStatus) && orderStatusEnum[record.orderStatus];
      return obj ? <Tag color={obj.status}>{obj.text}</Tag> : '-';
    },
  },
  {
    title: '操作',
    width: 90,
    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handle('view', record)}>详情</a>
        <Divider type="vertical" />
        <a onClick={() => handle('push', record)}>发货</a>
      </div>
    ),
  },
];

export const expandColumn = () => [
  {
    title: '商品信息',
    dataIndex: 'item',
    render: (_, record) => (
      <Space>
        <Image height={80} width={80} src={record.mainGraph} />
        <div>
          <b style={{ fontSize: '16px' }}>{record.itemName}</b>
          <div style={{ fontSize: '14px', color: '#ccc' }}>{record.model || '-'}</div>
          <div style={{ fontSize: '14px', color: '#1677ff' }}>ID:{record.itemId || '-'}</div>
        </div>
      </Space>
    ),
  },
  {
    title: 'sku单价/数量',
    dataIndex: 'unitPriceAndNumber',
    render: (_, record) => (
      <Space direction="vertical">
        <div>{`￥${record.unitPrice}`}</div>
        <div style={{ float: 'right' }}>{`x${record.amount}`}</div>
      </Space>
    ),
  },
  {
    title: '售后状态',
    dataIndex: 'afterSaleStatus',
    render: (_, record) => {
      const obj =
        (record.afterSaleStatus || record.afterSaleStatus === 0) &&
        afterSaleStatusEnum[record.afterSaleStatus];
      return obj ? <Tag color={obj.status}>{obj.text}</Tag> : '-';
    },
  },
];
