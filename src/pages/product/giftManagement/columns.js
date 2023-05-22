import { Divider } from 'antd';

export const columns = [
  {
    title: '赠品名称',
    dataIndex: 'level',

    width: 30,
  },
  {
    title: '成本价(元/件)',
    dataIndex: 'type',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '库存(件)',
    dataIndex: 'it',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '创建时间',
    dataIndex: 'time',

    ellipsis: true,
    hideInSearch: true,

    width: 30,
  },
  {
    title: '排序',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '商品分组',
    dataIndex: 'day',

    ellipsis: true,
    width: 30,
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',

    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small">
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
