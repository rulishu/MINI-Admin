import { Card, Image, Space, Tag } from 'antd';
import { orderStatusEnum, payEnum } from '../enum';

export const basicItem = [
  {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    span: 4,
    editable: () => false,
    labelStyle: {
      fontWeight: 'bold',
      color: '#000',
      fontSize: 15,
    },
    contentStyle: {
      fontWeight: 'bold',
      color: '#000',
      fontSize: 15,
    },
    render: (_, record) => {
      const obj = String(record.orderStatus) && orderStatusEnum[record.orderStatus];
      return obj ? <Tag color={obj.status}>{obj.text}</Tag> : '-';
    },
  },
  {
    title: '订单号',
    key: 'orderNumber',
    editable: () => false,
    dataIndex: 'orderNumber',
  },
  {
    title: '下单时间',
    key: 'createTime',
    editable: () => false,
    dataIndex: 'createTime',
  },
  {
    title: '付款时间',
    key: 'payDate',
    editable: () => false,
    dataIndex: 'payDate',
  },
  {
    title: '支付方式',
    key: 'payType',
    editable: () => false,
    dataIndex: 'payType',
    valueEnum: payEnum,
  },
  {
    title: '支付单号',
    key: 'payOrderNumber',
    editable: () => false,
    dataIndex: 'consignee',
  },
  {
    title: '发货时间',
    key: 'deliveryTime',
    editable: () => false,
    dataIndex: 'deliveryTime',
  },
  {
    title: '完成时间',
    key: 'consignee2',
    editable: () => false,
    dataIndex: 'consignee',
    span: 2,
  },
  {
    title: '订单备注',
    key: 'remark',
    dataIndex: 'remark',
  },
];

export const buyerItem = [
  {
    title: '用户昵称',
    key: 'userName',
    dataIndex: 'userName',
  },
  {
    title: '买家留言',
    key: 'remark',
    dataIndex: 'remark',
  },
];

export const receiveItem = [
  {
    title: '收件人',
    key: 'consignee',
    dataIndex: 'consignee',
  },
  {
    title: '联系方式',
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: '收货地址',
    key: 'receivingAddress',
    dataIndex: 'receivingAddress',
  },
];

export const productItem = [
  {
    title: '物流公司',
    key: 'companyName',
    dataIndex: 'companyName',
  },
  {
    title: '发货时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '运单号',
    key: 'trackingNumber',
    dataIndex: 'trackingNumber',
  },
  {
    title: '包裹内共x件商品',
    key: 'list',
    dataIndex: 'list',
    span: 3,
    valueType: () => {
      return (
        <Space size={[16, 16]} wrap>
          <Card>
            <Space>
              <Image height={40} width={40} src={''} />
              <div>
                <b style={{ fontSize: '14px' }}>乔宣咖啡 挂耳咖啡礼盒 10g*7包</b>
                <div style={{ fontSize: '14px', color: '#ccc' }}>规格值1，规格值2</div>
              </div>
              <div>x2</div>
            </Space>
          </Card>
        </Space>
      );
    },
  },
];

export const manageColumn = [
  {
    title: '商品信息',
    dataIndex: 'mainGraph',
    key: 'mainGraph',
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
    dataIndex: 'itemName',
    key: 'itemName',
    render: () => (
      <Space direction="vertical">
        <div>￥120.00</div>
        <div style={{ float: 'right' }}>x2</div>
      </Space>
    ),
  },
  {
    title: '售后状态',
    dataIndex: 'specifications',
    key: 'specifications',
    ellipsis: true,
    render: () => <Tag color="#f50">售后中</Tag>,
  },
  {
    title: '发货状态',
    dataIndex: 'model',
    key: 'model',
    ellipsis: true,
  },
  {
    title: 'sku总价',
    dataIndex: 'amount',
    key: 'amount',
    ellipsis: true,
    render: () => <div>￥245.00</div>,
  },
  {
    title: '促销信息',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    ellipsis: true,
  },
];
