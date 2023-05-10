import { Divider } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: '分组名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '在售商品数/商品数',
    dataIndex: 'name',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'name',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '操作',
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('manage', record)}>
          商品管理
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          修改
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('delete', record)}>
          删除
        </a>
      </div>
    ),
  },
];
