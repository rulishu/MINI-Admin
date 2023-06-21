import AImage from '@/components/AImage';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Tag, Typography } from 'antd';
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
    <Space direction="vertical" size={0}>
      <div style={{ maxWidth: 130 }}>{`￥${record.unitPrice}`}</div>
      <div
        style={{ maxWidth: 130, float: 'right', fontSize: '14px', color: '#ccc' }}
      >{`x${record.amount}`}</div>
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

const ProfitSharingGoodComp = ({ record }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        {' '}
        <AImage height={80} width={80} src={record.mainGraph} />
      </div>
      <div style={{ marginLeft: 12, width: 250 }}>
        <Typography.Text ellipsis={{ tooltip: record.itemName }} style={{ fontSize: '14px' }}>
          {record.itemName || '乔宣咖啡 挂耳咖啡礼盒'}
        </Typography.Text>
        <div style={{ fontSize: '14px', color: '#ccc' }}>
          {(record.attributes || []).map((item, i) => (
            <Fragment key={item.attributeId}>
              <span> {`${item.attributeName}:${item.value}`}</span>
              {i !== (record.attributes || []).length - 1 && <span>;</span>}
            </Fragment>
          ))}
          规格值1，规格值2
        </div>
        <div style={{ fontSize: '14px' }}>x2</div>
      </div>
    </div>
  );
};

const ProfitSharingUser = ({ showHead = true, headUrl, width }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {showHead &&
        (headUrl ? (
          <Avatar src={headUrl} size="default" />
        ) : (
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<UserOutlined />}
          />
        ))}
      <div style={{ textAlign: 'left', marginLeft: 8, width: width - 50 }}>
        <div>
          <Typography.Text ellipsis="Miracle-" style={{ fontWeight: 'bold' }}>
            Miracle-
          </Typography.Text>
        </div>
        <div>
          <Typography.Text
            ellipsis="经销等级：二级经销"
            style={{ fontSize: '14px', color: '#ccc' }}
          >
            经销等级：二级经销
          </Typography.Text>
        </div>
        <div>
          <Typography.Text ellipsis=" 代理等级：省级" style={{ fontSize: '14px', color: '#ccc' }}>
            代理等级：省级
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export {
  GoodInfoComp,
  AfterSaleStatusComp,
  OrderStatusComp,
  ShipmentStatusComp,
  SkuComp,
  EditTable,
  ProfitSharingGoodComp,
  ProfitSharingUser,
};
