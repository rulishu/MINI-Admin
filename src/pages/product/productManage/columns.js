import { Divider } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: '商品名称',
    dataIndex: 'itemName',
    align: 'center',
    ellipsis: true,
    width: 80,
  },
  {
    title: '商品型号',
    dataIndex: 'model',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '规格',
    dataIndex: 'specifications',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 80,
  },
  {
    title: '库存(件)',
    dataIndex: 'stock',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 80,
  },
  {
    title: '税率',
    dataIndex: 'taxRate',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 80,
  },
  {
    title: '商品价格',
    dataIndex: 'price',
    align: 'center',
    hideInSearch: true,
    ellipsis: true,
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 80,
  },
  // {
  //   title: '排序',
  //   dataIndex: 'order',
  //   align: 'center',
  //   ellipsis: true,
  //   hideInSearch: true,
  //   width: 80,
  // },
  {
    title: '商品分组',
    dataIndex: 'sort',
    align: 'center',
    ellipsis: true,
    width: 80,
  },
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
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          编辑
        </a>
        <Divider type="vertical" />
        {/* <a type="link" size="small" onClick={() => handleEdit('view', record)}>
          查看
        </a> */}
        <Divider type="vertical" />
        <a type="link" size="small ">
          复制
        </a>
      </div>
    ),
  },
];
