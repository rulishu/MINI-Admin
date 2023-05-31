import UserContent from '@/components/UserContent';
import { Divider, Image, Space, Tag } from 'antd';
import moment from 'moment';

export const columns = () => [
  {
    title: '用户信息',
    dataIndex: 'users',
    fieldProps: {
      placeholder: '用户昵称/用户编号/注册号码',
    },
    hideInTable: true,
  },
  {
    title: '订单编号',
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
    dataIndex: 'createTime',
    key: 'createTime',
    hideInSearch: true,
    render: (_, record) =>
      (record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
  },
  {
    title: '用户信息',
    dataIndex: 'user',
    key: 'user',
    hideInSearch: true,
    render: (_, record) => (
      <UserContent headUrl={''} name={record.userName} phone={record.userMobile} />
    ),
  },
];

export const expandColumn = ({ handle }) => [
  {
    title: '商品信息',
    dataIndex: 'date',
    key: 'date',
    render: (_, record) => (
      <Space>
        <Image height={80} width={80} src={record.mainGraph} />
        <div>
          <b style={{ fontSize: '16px' }}>乔宣咖啡 挂耳咖啡礼盒 10g*7包</b>
          <div style={{ fontSize: '14px', color: '#ccc' }}>规格值1，规格值2</div>
          <div style={{ fontSize: '14px', color: '#1677ff' }}>ID:36173573572</div>
        </div>
      </Space>
    ),
  },
  {
    title: 'sku单价/数量',
    dataIndex: 'name',
    key: 'name',
    render: () => (
      <Space direction="vertical">
        <div>￥120.00</div>
        <div style={{ float: 'right' }}>x2</div>
      </Space>
    ),
  },
  {
    title: '订单金额',
    key: 'state',
    render: () => <div>￥245.00</div>,
  },
  {
    title: '售后状态',
    dataIndex: 'upgradeNum',
    key: 'upgradeNum',
    render: () => <Tag color="#f50">售后中</Tag>,
  },
  {
    title: '收件信息',
    dataIndex: 'upgradeNum',
    key: 'upgradeNum',
    render: () => (
      <Space>
        <div>
          <b style={{ fontSize: '16px' }}>严佳能 17857001531</b>
          <div style={{ fontSize: '14px' }}>浙江省 杭州市 萧山区 蜀山街道</div>
          <div style={{ fontSize: '14px' }}>北辰奥园18-2-110</div>
        </div>
      </Space>
    ),
  },
  {
    title: '订单备注',
    dataIndex: 'remark',
    key: 'upgradeNum',
    render: () => <div>这里是订单备注订单备注</div>,
  },
  {
    title: '状订单态',
    dataIndex: 'remark',
    key: 'upgradeNum',
    render: () => <div>待发货</div>,
  },
  {
    title: '操作',
    render: (record) => (
      <div>
        <a onClick={() => handle('view', record)}>详情</a>
        <Divider type="vertical" />
        <a onClick={() => handle('push', record)}>发货</a>
      </div>
    ),
  },
];
