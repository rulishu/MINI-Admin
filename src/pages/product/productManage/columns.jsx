import PriceRange from '@/components/PriceRange';
import { Divider, Image } from 'antd';

export const columns = ({ handleEdit, options, categoryList }) => [
  {
    title: '商品名称',
    dataIndex: 'itemName',
    align: 'center',
    hideInTable: true,
    width: 200,
  },
  {
    title: '商品ID',
    dataIndex: 'id',
    align: 'center',
    hideInTable: true,
    width: 50,
  },
  {
    title: '商品',
    dataIndex: 'item',
    align: 'center',
    search: false,
    width: 200,
    render: (_, record) => {
      return (
        <div style={{ height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image width={80} height={80} src={record?.mainGraph} />
          {/* <Avatar shape="square" size="large" src={record?.mainGraph} /> */}
          <div style={{ flex: 1, marginLeft: 5, textAlign: 'left' }}>
            <p style={{ padding: 0, margin: 0 }}>
              {record?.itemName} {record?.model} * {record?.specifications}
            </p>
            <p style={{ padding: 0, margin: 0 }}>ID：{record?.id}</p>
          </div>
        </div>
      );
    },
  },
  {
    title: '商品类目',
    key: 'categoryId',
    dataIndex: 'cascader',
    align: 'center',
    width: 100,
    hideInTable: true,
    fieldProps: {
      expandTrigger: 'hover',
      options: options(),
      changeOnSelect: true,
      fieldNames: {
        children: 'children',
        label: 'label',
      },
    },
    valueType: 'cascader',
    render: (txt, record) => (
      <div style={{ textAlign: 'center' }}>
        {categoryList.find((item) => item?.id === record?.categoryId)?.categoryName}
      </div>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'createTimeRange',
    align: 'center',
    hideInTable: true,
    width: 80,
    valueType: 'dateRange',
  },
  {
    title: '开售时间',
    dataIndex: 'sellTimeRange',
    align: 'center',
    hideInTable: true,
    width: 80,
    valueType: 'dateRange',
  },

  // {
  //   title: '商品类型',
  //   dataIndex: '',
  //   align: 'center',
  //   hideInTable: true,
  //   width: 80,
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { text: '全部', status: 'Default' },
  //     running: { text: '运行中', status: 'Processing' },
  //     online: { text: '已上线', status: 'Success' },
  //     error: { text: '异常', status: 'Error' },
  //   },
  // },
  // {
  //   title: '单选按钮状态',
  //   dataIndex: 'status',
  //   hideInTable: true,

  //   valueType: 'radioButton',
  //   initialValue: 'all',
  //   width: 100,
  //   valueEnum: {
  //     all: { text: '全部', status: 'Default' },
  //     running: { text: '运行中', status: 'Processing' },
  //     online: { text: '已上线', status: 'Success' },
  //     error: { text: '异常', status: 'Error' },
  //   },
  // },
  {
    title: '价格',
    dataIndex: 'price',
    align: 'center',
    width: 80,
    valueType: 'digit',
    renderFormItem: () => <PriceRange />,
  },
  {
    title: '总库存',
    dataIndex: 'stock',
    align: 'center',
    search: false,
    width: 50,
  },
  {
    title: '总销量',
    dataIndex: 'volume',
    align: 'center',
    search: false,
    width: 80,
  },
  {
    title: '商品状态',
    dataIndex: '11111111111ss',
    align: 'center',
    search: false,
    width: 80,
  },
  {
    title: '供应商',
    dataIndex: '111111x',
    align: 'center',
    width: 80,
    valueType: 'select',
    valueEnum: {
      // all: { text: '全部', status: 'Default' },
      // running: { text: '运行中', status: 'Processing' },
      // online: { text: '已上线', status: 'Success' },
      // error: { text: '异常', status: 'Error' },
    },
  },
  // {
  //   title: '业务员',
  //   dataIndex: '111111ywy',
  //   align: 'center',
  //   search: false,
  //   width: 50,
  // },
  // {
  //   title: '商品状态',
  //   dataIndex: 'status',
  //   align: 'center',
  //   search: false,
  //   width: 50,
  // },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    search: false,
    width: 80,
  },
  {
    title: '开售时间',
    dataIndex: 'sellTime',
    align: 'center',
    search: false,
    width: 80,
  },
  // {
  //   title: '上架',
  //   dataIndex: '111111d',
  //   align: 'center',
  //   search: false,
  //   width: 50,
  // },
  {
    title: '操作',
    width: 120,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: (_, record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          编辑
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('upload', [record?.id])}>
          上架
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('down', [record?.id])}>
          下架
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('delete', [record?.id])}>
          删除
        </a>
        {/* <a type="link" size="small" onClick={() => handlerSKU(record)}>
          编辑sku
        </a> */}
      </div>
    ),
  },
];
