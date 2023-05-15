import { Divider, Image } from 'antd';
// 商品id，商品（需要有图），商品类目，价格，销量，库存，商品状态，创建时间，上架（上架时间）
export const columns = ({ handleEdit, handlerSKU }) => [
  {
    title: '商品id',
    dataIndex: 'id',
    align: 'center',
    search: false,
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
          <Image
            width={80}
            height={80}
            src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
          />
          <div style={{ flex: 1, marginLeft: 5, textAlign: 'left' }}>
            【爆品酒】 奋斗之露 {record?.itemName} {record?.model}*{record?.specifications}
          </div>
        </div>
      );
    },
  },
  {
    title: '类目',
    dataIndex: '111111',
    align: 'center',
    search: false,
    width: 50,
  },
  {
    title: '商品名称',
    dataIndex: 'itemName',
    align: 'center',
    hideInTable: true,
    width: 80,
  },
  // {
  //   title: '商品型号',
  //   dataIndex: 'model',
  //   align: 'center',
  //   ellipsis: true,
  //   width: 80,
  //   hideInSearch: true,
  // },
  // {
  //   title: '规格',
  //   dataIndex: 'specifications',
  //   align: 'center',
  //   ellipsis: true,
  //   hideInSearch: true,
  //   width: 80,
  // },
  // {
  //   title: '税率',
  //   dataIndex: 'taxRate',
  //   align: 'center',
  //   ellipsis: true,
  //   hideInSearch: true,
  //   width: 80,
  // },

  {
    title: '价格',
    dataIndex: 'price',
    align: 'center',
    search: false,
    width: 80,
  },
  {
    title: '销量',
    dataIndex: '111111a',
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
    title: '商品状态',
    dataIndex: 'status',
    align: 'center',
    search: false,
    width: 50,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    search: false,
    width: 80,
  },
  {
    title: '上架',
    dataIndex: '111111d',
    align: 'center',
    search: false,
    width: 50,
  },
  // {
  //   title: '排序',
  //   dataIndex: 'order',
  //   align: 'center',
  //   ellipsis: true,
  //   hideInSearch: true,
  //   width: 80,
  // },
  // {
  //   title: '商品分组',
  //   dataIndex: 'sort',
  //   align: 'center',
  //   ellipsis: true,
  //   width: 80,
  // },
  // {
  //   title: '销量商',
  //   dataIndex: 'companyName',
  //   align: 'center',
  //   ellipsis: true,
  //   width: 80,
  //   hideInTable: true,
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
        {/* <a type="link" size="small" onClick={() => handleEdit('view', record)}>
          查看
        </a> */}
        {/* <Divider type="vertical" /> */}
        <a type="link" size="small ">
          复制
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handlerSKU(record)}>
          编辑sku
        </a>
      </div>
    ),
  },
];
