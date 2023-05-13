import { Divider } from 'antd';

export const columns = (handle) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    align: 'center',
  },
  {
    title: '数量',
    dataIndex: 'preferentialAmount',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单金额',
    dataIndex: 'orderPrice',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '收货人',
    dataIndex: 'consignee',
    align: 'center',
  },
  {
    title: '下单日期',
    dataIndex: 'createTime',
    align: 'center',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    align: 'center',
    valueType: 'select',
    fieldProps: {
      options: [
        {
          label: '待定价',
          value: 0,
        },
        {
          label: '待付款',
          value: 1,
        },
        {
          label: '备货中',
          value: -2,
        },
        {
          label: '待收货',
          value: 3,
        },
        {
          label: '已完成',
          value: 4,
        },
      ],
    },
  },
  {
    title: '开票状态',
    dataIndex: 'isOpenInvoice',
    align: 'center',
    valueType: 'select',
    hideInSearch: true,
    fieldProps: {
      options: [
        {
          label: '未开票',
          value: 0,
        },
        {
          label: '待开票',
          value: 1,
        },
        {
          label: '已开票',
          value: 2,
        },
      ],
    },
  },
  {
    title: '操作',
    width: 150,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handle('view', record)}>
          查看详情
        </a>
        <Divider type="vertical" />
        {record.orderStatus === -2 && (
          <a type="link" size="small" onClick={() => handle('upOrder', record)}>
            上传单号
          </a>
        )}
      </div>
    ),
  },
];

export const schema = ({ queryData }) => {
  const itemList = queryData?.itemList || [];
  return {
    type: 'object',
    displayType: 'row',
    labelWidth: '100%',
    properties: {
      phone: {
        title: '手机号',
        type: 'string',
        span: 12,
        defaultValue: queryData.phone,
      },
      consignee: {
        title: '买家信息',
        type: 'string',
        span: 12,
        defaultValue: queryData.consignee,
      },
      itemList: {
        title: '商品详情',
        type: 'array',
        widget: 'tableList',
        items: {
          type: 'object',
          properties: {
            mainGraph: {
              title: '商品图片',
              type: 'string',
            },
            brandName: {
              title: '商品名称',
              type: 'string',
              defaultValue: itemList?.at(0)?.categoryName || '',
            },
            input3: {
              title: '规格',
              type: 'string',
              defaultValue: itemList?.at(0)?.brandName || '',
            },
            input4: {
              title: '型号',
              type: 'string',
              defaultValue: itemList?.at(0)?.brandName || '',
            },
            input5: {
              title: '数量',
              type: 'string',
              defaultValue: itemList?.at(0)?.brandName || '',
            },
            input6: {
              title: '商品价格(元)',
              type: 'string',
              defaultValue: itemList?.at(0)?.unitPrice || '',
            },
            input7: {
              title: '运费',
              type: 'string',
              defaultValue: itemList?.at(0)?.brandName || '',
            },
          },
        },
      },

      list: {
        type: 'array',
        widget: 'simpleList',
        display: 'inline',
        props: {
          hasBackground: true,
        },
        items: {
          type: 'object',
          properties: {
            createTime: {
              title: '下单时间',
              type: 'string',
              defaultValue: queryData.createTime,
            },
            orderStatus: {
              title: '订单状态',
              type: 'string',
              defaultValue: queryData.orderStatus,
            },
          },
        },
      },
      list1: {
        type: 'array',
        widget: 'simpleList',
        display: 'inline',
        props: {
          hasBackground: true,
        },
        items: {
          type: 'object',
          displayType: 'row',
          properties: {
            consignee: {
              title: '收货人',
              type: 'string',
              defaultValue: queryData.consignee,
              span: 12,
            },
            phone: {
              title: '手机号',
              type: 'string',
              defaultValue: queryData.phone,
              span: 12,
            },
            address: {
              title: '收货地址',
              type: 'string',
              defaultValue: queryData.address,
              span: 12,
              labelCol: 7,
              fieldCol: 16,
            },
            orderNumber: {
              title: '快递单号',
              type: 'string',
              defaultValue: queryData.orderNumber,
              span: 12,
              labelCol: 7,
              fieldCol: 16,
            },
            companyName: {
              title: '物流公司',
              type: 'string',
              span: 24,
              defaultValue: queryData.companyName,
            },
            isOpenInvoice: {
              title: '开票状态',
              type: 'string',
              defaultValue: queryData.isOpenInvoice,
            },
          },
        },
      },
    },
  };
};

export const schemaUpOrder = ({ companySelect }) => {
  return {
    type: 'object',
    displayType: 'row',
    labelWidth: '100%',
    properties: {
      logisticsCompany: {
        title: '物流公司',
        type: 'string',
        props: {
          options: companySelect,
        },
        placeholder: '请输入物流公司',
      },
      trackingNumber: {
        title: '运单号',
        type: 'string',
        required: true,
        placeholder: '请输入运单号',
      },
    },
  };
};
