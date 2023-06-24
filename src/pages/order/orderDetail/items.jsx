import AImage from '@/components/AImage';
import {
  AfterSaleStatusComp,
  GoodInfoComp,
  OrderStatusComp,
  ShipmentStatusComp,
  SkuComp,
} from '@/pages/order/orderManage/component';
import { Card, Space } from 'antd';
import { Fragment } from 'react';
import { payEnum } from './enum';

export const basicItem = [
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
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
    render: (_, record) => <OrderStatusComp record={record} />,
  },
  {
    title: '订单号',
    key: 'orderNumber',
    editable: () => false,
    dataIndex: 'orderNumber',
    ellipsis: true,
  },
  {
    title: '下单时间',
    key: 'createTime',
    editable: () => false,
    dataIndex: 'createTime',
    ellipsis: true,
  },
  {
    title: '付款时间',
    key: 'payDate',
    editable: () => false,
    dataIndex: 'payDate',
    ellipsis: true,
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
    key: 'paymentOrderNumber',
    editable: () => false,
    valueType: 'text',
    dataIndex: 'paymentOrderNumber',
    ellipsis: true,
  },
  {
    title: '发货时间',
    key: 'deliveryTime',
    editable: () => false,
    dataIndex: 'deliveryTime',
    ellipsis: true,
  },
  {
    title: '完成时间',
    key: 'endTime',
    editable: () => false,
    dataIndex: 'endTime',
    span: 2,
    ellipsis: true,
  },
  {
    title: '订单备注',
    key: 'backgroundMessage',
    editable: () => true,
    dataIndex: 'backgroundMessage',
    ellipsis: true,
  },
];

export const buyerItem = [
  {
    title: '用户昵称',
    key: 'userName',
    dataIndex: 'userName',
    ellipsis: true,
  },
  {
    title: '买家留言',
    key: 'remark',
    dataIndex: 'remark',
    ellipsis: true,
  },
];

export const receiveItem = [
  {
    title: '收件人',
    key: 'consignee',
    dataIndex: 'consignee',
    ellipsis: true,
  },
  {
    title: '联系方式',
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
];

export const productItem = ({ number = 0 }) => [
  {
    title: '物流公司',
    key: 'logisticsCompany',
    dataIndex: 'logisticsCompany',
    ellipsis: true,
  },
  {
    title: '发货时间',
    key: 'createTime',
    dataIndex: 'createTime',
    ellipsis: true,
  },
  {
    title: '运单号',
    key: 'trackingNumber',
    dataIndex: 'trackingNumber',
    ellipsis: true,
  },
  {
    title: `包裹内共${number}件商品`,
    key: 'item',
    dataIndex: 'item',
    span: 3,
    render: (_, record) => {
      return (
        <Space size={[16, 16]} wrap>
          {(record.items || []).map((data, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Card key={index}>
                <Space>
                  <AImage height={40} width={40} src={data.mainGraph || '-'} />
                  <div>
                    <b style={{ fontSize: '14px' }}>{data.itemName || '-'}</b>
                    <div style={{ fontSize: '14px', color: '#ccc' }}>
                      {(data.attributes || []).map((attr, i) => (
                        <Fragment key={attr.attributeId}>
                          <span> {`${attr.attributeName}:${attr.value}`}</span>
                          {i !== (data.attributes || []).length - 1 && <span>;</span>}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <div>x{data.amount}</div>
                </Space>
              </Card>
            );
          })}
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
    width: 250,
    render: (_, record) => <GoodInfoComp record={record} />,
  },
  {
    title: 'sku单价/数量',
    dataIndex: 'itemName',
    width: 130,
    key: 'itemName',
    render: (_, record) => <SkuComp record={record} />,
  },
  {
    title: '售后状态',
    dataIndex: 'afterSaleStatus',
    width: 100,
    key: 'afterSaleStatus',
    ellipsis: true,
    render: (_, record) => <AfterSaleStatusComp record={record} />,
  },
  {
    title: '发货状态',
    dataIndex: 'shipmentStatus',
    key: 'shipmentStatus',
    width: 100,
    render: (_, record) => <ShipmentStatusComp record={record} />,
  },
  {
    title: 'sku总价',
    dataIndex: 'totalPrice',
    width: 100,
    key: 'totalPrice',
    ellipsis: true,
    render: (_, record) => <div style={{ width: 90 }}>￥{record.totalPrice}</div>,
  },
  {
    title: '促销信息',
    dataIndex: 'saleMessage',
    width: 90,
    key: 'saleMessage',
    render: () => '-',
  },
];
