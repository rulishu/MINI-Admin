import { CheckOutlined, CloseOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons';
import { Divider, Input, Skeleton, Space, Typography } from 'antd';
import { Fragment } from 'react';
import { AfterSaleStatusComp, GoodInfoComp, OrderStatusComp, SkuComp } from './component';
const { Text } = Typography;

export const columns = ({ supplierName, handle, activeKey, tableLoading }) => [
  {
    title: '用户ID',
    dataIndex: 'userId',
    fieldProps: {
      placeholder: '请输入用户ID/用户编号/注册号码',
    },
    hideInTable: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    fieldProps: {
      placeholder: '请输入订单编号',
    },
    hideInTable: true,
  },
  {
    title: '下单时间',
    dataIndex: 'startTime',
    hideInTable: true,
    valueType: 'dateRange',
    fieldProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
    },
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
    title: '用户昵称',
    dataIndex: 'userName',
    fieldProps: {
      placeholder: '请输入用户昵称',
    },
    hideInTable: true,
  },
  {
    title: '用户手机',
    dataIndex: 'userMobile',
    fieldProps: {
      placeholder: '请输入用户手机',
    },
    hideInTable: true,
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    fieldProps: {
      placeholder: '请输入商品名称',
    },
    hideInTable: true,
  },
  {
    title: '商品ID',
    dataIndex: 'itemId',
    fieldProps: {
      placeholder: '请输入商品ID',
    },
    hideInTable: true,
  },
  {
    title: '供应商',
    dataIndex: 'supplierId',
    valueType: 'select',
    hideInTable: true,
    fieldProps: {
      placeholder: '请输入供应商',
      options: supplierName.options,
      onFocus: supplierName.onFocus,
      onSearch: supplierName.onSearch,
      filterOption: false,
      showSearch: true,
      allowClear: true,
    },
  },
  {
    title: '物流单号',
    dataIndex: 'logisticsTrackingNumber',
    fieldProps: {
      placeholder: '请输入物流单号',
    },
    hideInTable: true,
  },
  {
    title: '商品信息',
    dataIndex: 'info',
    key: 'info',
    hideInSearch: true,
    onCell: () => ({
      colSpan: 7,
    }),
    render: (_, row) => {
      return (
        <Skeleton active loading={tableLoading}>
          <Space size="large">
            <span>
              订单编号：<span>{row.orderNumber}</span>{' '}
              <CopyOutlined
                onClick={() => handle('copy', { orderNumber: row.orderNumber })}
                style={{ color: '#1677ff' }}
              />
            </span>
            <span>下单时间：{row.createTime || '-'}</span>
            <span>
              【用户：{row.userName || '-'} ID：{row.userId || '-'}】
            </span>
          </Space>
        </Skeleton>
      );
    },
  },
  {
    title: 'sku单价/数量',
    dataIndex: 'sku',
    width: 150,
    key: 'sku',
    hideInSearch: true,
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '订单金额',
    dataIndex: 'orderPrice',
    width: 100,
    key: 'orderPrice',
    hideInSearch: true,
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '售后状态',
    dataIndex: 'afterSaleStatus',
    width: 100,
    key: 'afterSaleStatus',
    hideInSearch: true,
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '收件信息',
    dataIndex: 'receiveInfo',
    key: 'receiveInfo',
    hideInSearch: true,
    width: 250,
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '订单备注',
    dataIndex: 'backgroundMessage',
    hideInSearch: true,
    width: 180,
    key: 'address',
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    hideInSearch: true,
    width: 100,
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    hideInSearch: true,
    width: 120,
    render: (_, record) => {
      const { logisticsStatus } = record;
      const canPush = logisticsStatus === 0 && activeKey === 2;
      return (
        <div>
          <a onClick={() => handle('view', record)}>详情</a>
          {canPush && (
            <Fragment>
              <Divider type="vertical" />
              <a onClick={() => handle('push', record)}>发货</a>
            </Fragment>
          )}
        </div>
      );
    },
  },
];

export const expandColumns = ({ rowData, handle }) => [
  {
    dataIndex: 'info',
    key: 'info',
    render: (_, record) => <GoodInfoComp record={record} />,
  },
  {
    width: 150,
    dataIndex: 'sku',
    key: 'sku',
    render: (_, record) => <SkuComp record={record} />,
  },
  {
    width: 100,
    dataIndex: 'orderPrice',
    key: 'orderPrice',
    render: () => '￥' + rowData.orderPrice || '-',
  },
  {
    width: 100,
    dataIndex: 'afterSaleStatus',
    key: 'afterSaleStatus',
    render: () => (
      <AfterSaleStatusComp onClick={() => handle('goAfterSale', rowData)} record={rowData} />
    ),
  },
  {
    dataIndex: 'receiveInfo',
    key: 'receiveInfo',
    width: 250,
    render: () => {
      return (
        <Space>
          <div style={{ width: 220 }}>
            <Text
              ellipsis={{ tooltip: `${rowData.consignee || '-'} ${rowData.phone || '-'} ` }}
              style={{ fontSize: '14px' }}
            >
              {rowData.consignee || '-'} {rowData.phone || '-'}
            </Text>
            <Text
              ellipsis={{ tooltip: rowData.address }}
              style={{ fontSize: '14px', color: '#ccc' }}
            >
              {rowData.address || '-'}
            </Text>
          </div>
        </Space>
      );
    },
  },
  {
    width: 180,
    dataIndex: 'backgroundMessage',
    key: 'backgroundMessage',
    render: () => {
      return (
        <div style={{ width: 150 }}>
          {rowData.edit ? (
            <Space direction="horizontal">
              <Input
                style={{ width: 120 }}
                onChange={(value) => handle('changeRemark', rowData, value)}
                value={rowData.backgroundMessage}
                allowClear
              />
              <CheckOutlined
                style={{ color: '#1677ff' }}
                onClick={() => handle('saveRemark', rowData)}
              />
              <CloseOutlined
                style={{ color: '#1677ff' }}
                onClick={() => handle('cancelRemark', rowData)}
              />
            </Space>
          ) : (
            <span style={{ width: 150, display: 'flex' }}>
              <Text ellipsis={{ tooltip: rowData?.backgroundMessage }}>
                {rowData.backgroundMessage || '-'}
              </Text>
              <EditOutlined
                style={{ marginLeft: 8 }}
                onClick={() => handle('editRemark', rowData)}
              />
            </span>
          )}
        </div>
      );
    },
  },
  {
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    width: 100,
    render: () => <OrderStatusComp record={rowData} />,
  },
  {
    dataIndex: 'operate',
    key: 'operate',
    width: 120,
  },
];
