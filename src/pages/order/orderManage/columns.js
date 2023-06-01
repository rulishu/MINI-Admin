import { DatePicker, Image, Space, Tag } from 'antd';
import { afterSaleStatusEnum, orderStatusEnum } from './enum';

// eslint-disable-next-line no-unused-vars
export const searchItem = ({ userId, supplierName }) => [
  {
    title: '用户',
    dataIndex: 'keyword',
    fieldProps: {
      placeholder: '请输入用户昵称/用户编号/注册号码',
    },
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
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    fieldProps: {
      placeholder: '请输入商品名称',
    },
  },
  {
    title: '创建时间',
    dataIndex: 'startTime',
    renderFormItem: () => <DatePicker.RangePicker showTime={true} />,
  },
  {
    title: '供应商',
    dataIndex: 'supplierName',
    valueType: 'select',
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
    dataIndex: 'trackingNumber',
    fieldProps: {
      placeholder: '请输入物流单号',
    },
  },
];

export const columns = () => [
  {
    title: '商品信息',
    dataIndex: 'orders',
    key: 'orders',
    render: (record) => (
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
    width: 120,
    dataIndex: 'unitPriceAndNumber',
    key: 'unitPriceAndNumber',
    render: (record) => (
      <Space direction="vertical">
        <b>{`￥${record.unitPrice}`}</b>
        <div style={{ float: 'right', fontSize: '14px', color: '#ccc' }}>{`x${record.amount}`}</div>
      </Space>
    ),
  },
  {
    title: '订单金额',
    width: 90,
    dataIndex: 'orderPrice',
    key: 'orderPrice',
    render: (_, record) => '￥' + record.orderPrice || '-',
  },
  {
    title: '售后状态',
    width: 90,
    dataIndex: 'afterSaleStatus',
    key: 'afterSaleStatus',
    render: (record) => {
      const obj =
        (record.afterSaleStatus || record.afterSaleStatus === 0) &&
        afterSaleStatusEnum[record.afterSaleStatus];
      return obj ? <Tag color={obj.status}>{obj.text}</Tag> : '-';
    },
  },
  {
    title: '收件信息',
    width: 200,
    dataIndex: 'upgradeNum',
    key: 'upgradeNum',
    render: (record) => {
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
    key: 'remark',
    width: 120,
    render: (_, record) => record.remark || '-',
  },
  {
    title: '订单状态',
    width: 90,
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    render: (_, record) => {
      const obj = String(record.orderStatus) && orderStatusEnum[record.orderStatus];
      return obj ? <Tag color={obj.status}>{obj.text}</Tag> : '-';
    },
  },
  {
    title: '操作',
    width: 120,
    key: 'operate',
  },
];
