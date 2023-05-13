import { Divider } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '申请原因',
    dataIndex: 'reason',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    align: 'center',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          编辑
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('delete', record)}>
          删除
        </a>
      </div>
    ),
  },
];
