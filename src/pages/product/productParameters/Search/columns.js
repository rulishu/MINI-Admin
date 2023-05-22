import { Divider } from 'antd';

export const columns = [
  {
    title: '参数项',
    dataIndex: 'name',
  },
  {
    title: '参数值',
    dataIndex: 'name',

    hideInSearch: true,
  },
  {
    title: '所属类目',
    dataIndex: 'name',

    hideInSearch: true,
  },
  {
    title: '商品发布页',
    dataIndex: 'name',

    hideInSearch: true,
  },
  {
    title: '操作',
    fixed: 'right',

    hideInSearch: true,
    render: () => (
      <div>
        <a
          type="link"
          size="small"
          // onClick={() => handleEdit('edit', record)}
        >
          修改
        </a>
        <Divider type="vertical" />
        <a
          type="link"
          size="small"
          // onClick={() => handleEdit('edit', record)}
        >
          删除
        </a>
      </div>
    ),
  },
];
