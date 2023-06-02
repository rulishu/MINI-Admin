import { Divider, Image, Space, Tag, Typography } from 'antd';
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
    dataIndex: 'supplierName',
    valueType: 'select',
    fieldProps: {
      placeholder: '请输入供应商',
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
  // {
  //   title: '创建时间',
  //   dataIndex: 'startTime',
  //   renderFormItem: () => <DatePicker.RangePicker showTime={true} />,
  // },
  // {
  //   title: '供应商',
  //   dataIndex: 'supplierName',
  //   valueType: 'select',
  //   fieldProps: {
  //     placeholder: '请输入供应商',
  //     options: supplierName.options,
  //     onFocus: supplierName.onFocus,
  //     onSearch: supplierName.onSearch,
  //     filterOption: false,
  //     showSearch: true,
  //     allowClear: true,
  //   },
  // },
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
              text: row?.orderNumber,
            }}
          >
            售后编号：{row?.orderNumber}
          </Paragraph>

          <span>申请时间：{row?.createTime}</span>
          <Tag>未发货待退款</Tag>
        </Space>
      );
    },
  },
  {
    title: 'sku单价/数量',
    width: 120,
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
    dataIndex: '11111111orderPrice',
    key: 'orderPrice',
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '退款金额',
    width: 90,
    dataIndex: '111111111orderPrice',
    key: 'orderPrice',
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '售后状态',
    width: 90,
    dataIndex: 'afterSaleStatus',
    key: 'afterSaleStatus',
    onCell: () => ({
      colSpan: 0,
    }),
    render: () => null,
  },
  {
    title: '原因',
    dataIndex: 'remark',
    key: 'remark',
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

export const expandColumns = ({ activeKey, showModal }) => [
  {
    // title: '商品信息',
    dataIndex: 'orders',
    key: 'orders',
    render: (record) => (
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
    width: 120,
    dataIndex: 'unitPriceAndNumber',
    key: 'unitPriceAndNumber',
    render: (record) => (
      <Space direction="vertical">
        <b>{`￥${record?.unitPrice}`}</b>
        <div
          style={{ float: 'right', fontSize: '14px', color: '#ccc' }}
        >{`x${record?.amount}`}</div>
      </Space>
    ),
  },
  {
    // title: 'sku实付金额',
    width: 120,
    dataIndex: '11111111orderPrice',
    key: 'orderPrice',
    render: (_, record) => '￥' + record?.orderPrice || '-',
  },
  {
    // title: '退款金额',
    width: 90,
    dataIndex: '111111111orderPrice',
    key: 'orderPrice',
    render: (_, record) => '￥' + record?.orderPrice || '-',
  },
  {
    // title: '售后状态',
    width: 90,
    dataIndex: 'afterSaleStatus',
    key: 'afterSaleStatus',
    render: (record) => {
      const obj =
        (record?.afterSaleStatus || record?.afterSaleStatus === 0) &&
        afterSaleStatusEnum[record.afterSaleStatus];
      return obj ? <Tag color={obj?.status}>{obj.text}</Tag> : '-';
    },
  },
  {
    // title: '原因',
    dataIndex: 'remark',
    key: 'remark',
    width: 120,
    render: (_, record) => record?.remark || '-',
  },
  {
    // title: '操作',
    width: 120,
    key: '_operate_',
    render: (_, record) => {
      if (
        (activeKey === '1' && record?.afterSaleStatus === '待审核') ||
        (activeKey === '2' && record?.afterSaleStatus === '待审核')
      ) {
        return (
          <div>
            <a
              onClick={() => {
                showModal();
              }}
            >
              同意退款
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                showModal();
              }}
            >
              拒绝退款
            </a>
          </div>
        );
      }
      if (activeKey === '3' && record?.afterSaleStatus === '待审核') {
        return (
          <div>
            <a
              onClick={() => {
                showModal();
              }}
            >
              同意退货
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                showModal();
              }}
            >
              拒绝退货
            </a>
          </div>
        );
      }
      if (activeKey === '3' && record?.afterSaleStatus === '待平台收货') {
        return (
          <div>
            <a
              onClick={() => {
                showModal();
              }}
            >
              确认收货
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                showModal();
              }}
            >
              拒绝收货
            </a>
          </div>
        );
      }
    },
  },
];
