import PriceRange from '@/components/PriceRange';
import { Divider, Image } from 'antd';
// 商品id，商品（需要有图），商品类目，价格，销量，库存，商品状态，创建时间，上架（上架时间）
export const columns = ({ handleEdit, handlerSKU, options, categoryList }) => [
  {
    title: '商品ID',
    dataIndex: 'id',
    align: 'center',
    width: 50,
  },
  {
    title: '商品',
    dataIndex: 'itemName',
    align: 'center',
    search: false,
    width: 200,
    render: (_, record) => {
      return (
        <div style={{ height: 80, display: 'flex', flexDirection: 'row' }}>
          <Image width={80} height={80} src={record?.mainGraph} />
          <div style={{ flex: 1, marginLeft: 5, textAlign: 'left' }}>
            {record?.itemName} {record?.model}*{record?.specifications}
          </div>
        </div>
      );
    },
  },
  {
    title: '商品类目',
    key: 'categoryId',
    dataIndex: 'cascader',
    width: 100,
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
    renderText: (txt) => categoryList.find((item) => item?.id === txt)?.categoryName,
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    align: 'center',
    hideInTable: true,
    width: 80,
  },
  {
    title: '时间',
    dataIndex: 'timerange',
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
    title: '销量',
    dataIndex: 'volume',
    align: 'center',
    search: false,
    width: 80,
  },
  {
    title: '库存',
    dataIndex: 'stock',
    align: 'center',
    search: false,
    width: 50,
  },
  {
    title: '销售商',
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
  {
    title: '业务员',
    dataIndex: '111111ywy',
    align: 'center',
    search: false,
    width: 50,
  },

  // {
  //   title: '商品状态',
  //   dataIndex: 'status',
  //   align: 'center',
  //   search: false,
  //   width: 50,
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   align: 'center',
  //   search: false,
  //   width: 80,
  // },
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
        <a type="link" size="small" onClick={() => handlerSKU(record)}>
          编辑sku
        </a>
      </div>
    ),
  },
];
