import AImage from '@/components/AImage';
import { Space, Tag, Typography } from 'antd';
import { Fragment } from 'react';
import { afterSaleStatusEnum, orderStatusEnum, shipmentsStatusEnum } from '../enum';
import EditTable from './EditTable';

// 商品信息
const GoodInfoComp = ({ record }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        {' '}
        <AImage height={80} width={80} src={record.mainGraph} />
      </div>
      <div style={{ marginLeft: 12, width: 250 }}>
        <Typography.Text ellipsis={{ tooltip: record.itemName }} style={{ fontSize: '14px' }}>
          {record.itemName}
        </Typography.Text>
        <div style={{ fontSize: '14px', color: '#ccc' }}>
          {(record.attributes || []).map((item, i) => (
            <Fragment key={item.attributeId}>
              <span> {`${item.attributeName}:${item.value}`}</span>
              {i !== (record.attributes || []).length - 1 && <span>;</span>}
            </Fragment>
          ))}
        </div>
        <div style={{ fontSize: '14px', color: '#1677ff' }}>ID:{record.itemId || '-'}</div>
      </div>
    </div>
  );
};

// sku单价/数量
const SkuComp = ({ record }) => {
  return (
    <Space direction="vertical" size={0} style={{ width: 130 }}>
      <Typography.Text
        ellipsis={{ tooltip: `￥${record.unitPrice}` }}
      >{`￥${record.unitPrice}`}</Typography.Text>
      <Typography.Text
        ellipsis={{ tooltip: `x${record.amount}` }}
        style={{ float: 'right', fontSize: '14px', color: '#ccc' }}
      >{`x${record.amount}`}</Typography.Text>
    </Space>
  );
};

// 售后状态
const AfterSaleStatusComp = ({ record, onClick }) => {
  const obj = record.afterSaleStatus && afterSaleStatusEnum[record.afterSaleStatus];
  return obj ? (
    <Tag color={obj.status} onClick={() => onClick?.()}>
      {obj.text}
    </Tag>
  ) : (
    '-'
  );
};

// 订单状态
const OrderStatusComp = ({ record }) => {
  const obj = String(record.orderStatus) && orderStatusEnum[record.orderStatus];
  return obj ? <Tag color={obj.status}>{obj.text}</Tag> : '-';
};

// 发货状态
const ShipmentStatusComp = ({ record }) => {
  const obj = shipmentsStatusEnum[record.shipmentStatus] || {};
  return obj && <Tag color={obj.status}>{obj.text}</Tag>;
};

export {
  GoodInfoComp,
  AfterSaleStatusComp,
  OrderStatusComp,
  ShipmentStatusComp,
  SkuComp,
  EditTable,
};
