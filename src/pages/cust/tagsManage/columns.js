import { Divider } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: '关键词',
    dataIndex: 'key',
    hideInTable: true,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,

    hideInSearch: true,
  },
  {
    title: '标签类别',
    dataIndex: 'type',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '标签名称',
    dataIndex: 'name',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '客户数',
    dataIndex: 'number',

    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 90,
    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('delete', record)}>
          删除
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          编辑
        </a>
      </div>
    ),
  },
];
