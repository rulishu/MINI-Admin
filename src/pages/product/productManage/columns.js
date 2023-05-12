import { Divider } from 'antd';

export const columns = (edit) => [
  {
    title: '商品名称',
    dataIndex: 'itemName',
    align: 'center',
    ellipsis: true,
    width: 80,
  },
  {
    title: '销售价(元/件)',
    dataIndex: 'itemPrice',
    align: 'center',
    hideInSearch: true,
    ellipsis: true,
    width: 80,
  },
  {
    title: '成本价(元/件)',
    dataIndex: 'type',
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
    title: '销量(件)',
    dataIndex: 'num',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
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
  {
    title: '排序',
    dataIndex: 'order',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 80,
  },
  {
    title: '商品分组',
    dataIndex: 'sort',
    align: 'center',
    ellipsis: true,
    width: 80,
  },
  {
    title: '销量商',
    dataIndex: 'companyName',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInTable: true,
  },
  {
    title: '操作',
    width: 120,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small" onClick={() => edit()}>
          编辑
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          查看
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          复制
        </a>
      </div>
    ),
  },
];
