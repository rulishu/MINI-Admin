import AImage from '@/components/AImage';
import { Card, Space } from 'antd';
import { Fragment } from 'react';
import {
  AfterSaleStatusComp,
  GoodInfoComp,
  OrderStatusComp,
  ShipmentStatusComp,
  SkuComp,
} from '../component';
import { payEnum } from '../enum';

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
    key: 'paymentOrderNumber',
    editable: () => false,
    dataIndex: 'paymentOrderNumber',
  },
  {
    title: '发货时间',
    key: 'deliveryTime',
    editable: () => false,
    dataIndex: 'deliveryTime',
  },
  {
    title: '完成时间',
    key: 'endTime',
    editable: () => false,
    dataIndex: 'endTime',
    span: 2,
  },
  {
    title: '订单备注',
    key: 'backgroundMessage',
    editable: () => true,
    dataIndex: 'backgroundMessage',
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
    key: 'address',
    dataIndex: 'address',
  },
];

export const productItem = ({ number = 0 }) => [
  {
    title: '物流公司',
    key: 'logisticsCompany',
    dataIndex: 'logisticsCompany',
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
    width: 200,
    render: (_, record) => <GoodInfoComp record={record} />,
  },
  {
    title: 'sku单价/数量',
    dataIndex: 'itemName',
    width: 120,
    key: 'itemName',
    render: (_, record) => <SkuComp record={record} />,
  },
  {
    title: '售后状态',
    dataIndex: 'afterSaleStatus',
    width: 90,
    key: 'afterSaleStatus',
    ellipsis: true,
    render: (_, record) => <AfterSaleStatusComp record={record} />,
  },
  {
    title: '发货状态',
    dataIndex: 'shipmentStatus',
    key: 'shipmentStatus',
    width: 120,
    render: (_, record) => <ShipmentStatusComp record={record} />,
  },
  {
    title: 'sku总价',
    dataIndex: 'totalPrice',
    width: 90,
    key: 'totalPrice',
    ellipsis: true,
    render: (_, record) => <div>￥{record.totalPrice}</div>,
  },
  {
    title: '促销信息',
    dataIndex: 'saleMessage',
    width: 90,
    key: 'saleMessage',
    render: () => '-',
  },
];
