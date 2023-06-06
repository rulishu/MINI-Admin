import { Image, Space, Tag, Typography } from 'antd';
import { afterSaleStatusEnum } from './enum';
const { Paragraph } = Typography;

export const searchItem = () => [
  {
    title: '用户',
    dataIndex: 'keyword',
    fieldProps: {
      placeholder: '请输入用户昵称/用户编号/注册号码',
    },
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    fieldProps: {
      placeholder: '请输入订单编号',
    },
  },
  {
    title: '售后类型',
    dataIndex: 'afterType',
    valueType: 'select',
    fieldProps: {
      placeholder: '请输入售后类型',
      options: [
        {
          label: '未发货仅退款',
          value: 1,
        },
        {
          label: '已发货仅退款',
          value: 2,
        },
        {
          label: '已发货退货退款',
          value: 3,
        },
      ],
      filterOption: false,
      showSearch: true,
      allowClear: true,
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
    title: '物流单号',
    dataIndex: 'return_order_number',
    fieldProps: {
      placeholder: '请输入物流单号',
    },
  },
];

export const columns = () => [
  {
    title: '商品信息',
    dataIndex: 'goodsInfo',
    key: 'goodsInfo',
    onCell: () => ({
      colSpan: 6,
    }),
    render: (_, row) => {
      return (
        <Space size="large" align="center">
          <Paragraph
            style={{ margin: 0 }}
            copyable={{
              text: row?.orderNumber,
            }}
          >
            订单编号：{row?.orderNumber}
          </Paragraph>
          <Paragraph
            style={{ margin: 0 }}
            copyable={{
              text: row?.afterServiceCode,
            }}
          >
            售后编号：{row?.afterServiceCode}
          </Paragraph>

          <span>申请时间：{row?.orderCreateTime}</span>
          {(row?.orderStatus || row?.afterServiceType) && (
            <Tag>
              {row?.orderStatus}
              {row?.afterServiceType}
            </Tag>
          )}
        </Space>
      );
    },
  },
  {
    title: 'sku单价/数量',
    width: 140,
    dataIndex: 'unitPriceAndNumber',
    key: 'unitPriceAndNumber',
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: 'sku实付金额',
    width: 120,
    dataIndex: 'payAmount',
    key: 'payAmount',
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '退款金额',
    width: 120,
    dataIndex: 'refundSuccessAmount',
    key: 'refundSuccessAmount',
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '售后状态',
    width: 120,
    dataIndex: 'afterSaleStatus',
    key: 'afterSaleStatus',
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '原因',
    dataIndex: 'reason',
    key: 'reason',
    width: 120,
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '操作',
    width: 120,
    key: '_operate_',
  },
];

export const expandColumns = ({ handlerAction }) => [
  // { dataIndex: 'empty', key: 'empty', width: 48 },
  {
    // title: '商品信息',
    dataIndex: 'goodsInfo',
    key: 'goodsInfo',
    render: (_, record) => (
      <Space>
        <Image height={80} width={80} src={record?.mainGraph} />
        <div>
          <b style={{ fontSize: '16px' }}>{record?.itemName}</b>
          <div style={{ fontSize: '14px', color: '#ccc' }}>{record?.model || '-'}</div>
          <div style={{ fontSize: '14px', color: '#1677ff' }}>ID:{record?.itemId || '-'}</div>
        </div>
      </Space>
    ),
  },
  {
    // title: 'sku单价/数量',
    width: 140,
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (_, record) => (
      <Space direction="vertical">
        <b>{record?.unitPrice && `￥${record?.unitPrice}`}</b>
        <div style={{ float: 'right', fontSize: '14px', color: '#ccc' }}>
          {record?.shipmentAcount && `x${record?.shipmentAcount}`}
        </div>
      </Space>
    ),
  },
  {
    // title: 'sku实付金额',
    width: 120,
    dataIndex: 'payAmount',
    key: 'payAmount',
    render: (_, record) => '￥' + record?.totalPrice || '-',
  },
  {
    // title: '退款金额',
    width: 120,
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (_, record) => '￥' + record?.totalPrice || '-',
  },
  {
    // title: '售后状态',
    width: 120,
    dataIndex: 'afterSaleStatus',
    key: 'afterSaleStatus',
    render: (_, record) => {
      const obj =
        (record?.afterSaleStatus || record?.afterSaleStatus === 0) &&
        afterSaleStatusEnum[record.afterSaleStatus];
      return obj ? <Tag color={obj?.status}>{obj.text}</Tag> : '-';
    },
  },
  {
    // title: '原因',
    dataIndex: 'reason',
    key: 'reason',
    width: 120,
    render: (_, record) => record?.reason || '-',
  },
  {
    // title: '操作',
    width: 120,
    key: '_operate_',
    render: handlerAction,
  },
];
