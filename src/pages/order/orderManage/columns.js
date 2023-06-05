import { CopyOutlined } from '@ant-design/icons';
import { Divider, Image, Space, Tag } from 'antd';
import { Fragment } from 'react';
import { afterSaleStatusEnum, orderStatusEnum } from './enum';

export const columns = ({ supplierName, handle }) => [
  {
    title: '用户',
    dataIndex: 'userQuery',
    fieldProps: {
      placeholder: '请输入用户昵称/用户编号/注册号码',
    },
    hideInTable: true,
  },
  // {
  //   title: '用户',
  //   dataIndex: 'userId',
  //   valueType: 'select',
  //   fieldProps: {
  //     placeholder: '请选择用户',
  //     options: userId.options,
  //     onFocus: userId.onFocus,
  //     onSearch: userId.onSearch,
  //     filterOption: false,
  //     showSearch: true,
  //     allowClear: true,
  //   },
  // },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    fieldProps: {
      placeholder: '请输入订单编号',
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
    title: '创建时间',
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
    dataIndex: 'ogisticsTrackingNumber',
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
            {row.userName && <span>{row.userName}</span>}{' '}
            {row.userId && <span>ID：{row.userId}</span>}
          </span>
        </Space>
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
    dataIndex: 'remark',
    hideInSearch: true,
    width: 150,
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
      // const { orderStatus } = record;
      // orderStatus === 1 || orderStatus === 4 || orderStatus === -2;
      const canPush = false;
      return (
        <div>
          <a onClick={() => handle('view', record)}>详情</a>
          {!canPush && (
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

export const expandColumns = ({ rowData }) => [
  {
    dataIndex: 'info',
    key: 'info',
    render: (_, record) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          {' '}
          <Image height={80} width={80} src={record.mainGraph} />
        </div>
        <div style={{ marginLeft: 12 }}>
          <b style={{ fontSize: '14px' }}>{record.itemName}</b>
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
    ),
  },
  {
    width: 150,
    dataIndex: 'sku',
    key: 'sku',
    render: (_, record) => (
      <Space direction="vertical" size={0}>
        <div>{`￥${record.unitPrice}`}</div>
        <div style={{ float: 'right', fontSize: '14px', color: '#ccc' }}>{`x${record.amount}`}</div>
      </Space>
    ),
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
    render: () => {
      const obj =
        (rowData.afterSaleStatus || rowData.afterSaleStatus === 0) &&
        afterSaleStatusEnum[rowData.afterSaleStatus];
      return obj ? <Tag color={obj.status}>{obj.text}</Tag> : '-';
    },
  },
  {
    dataIndex: 'receiveInfo',
    key: 'receiveInfo',
    width: 250,
    render: () => {
      return (
        <Space>
          <div>
            <b style={{ fontSize: '14px' }}>
              {rowData.consignee || '-'} {rowData.phone || '-'}
            </b>
            <div style={{ fontSize: '14px', color: '#ccc' }}>{rowData.address || '-'}</div>
          </div>
        </Space>
      );
    },
  },
  {
    width: 150,
    dataIndex: 'remark',
    key: 'remark',
    render: () => rowData.remark || '-',
  },
  {
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    width: 100,
    render: () => {
      const obj = String(rowData.orderStatus) && orderStatusEnum[rowData.orderStatus];
      return obj ? <Tag color={obj.status}>{obj.text}</Tag> : '-';
    },
  },
  {
    dataIndex: 'operate',
    key: 'operate',
    width: 120,
  },
];
