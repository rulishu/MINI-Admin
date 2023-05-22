import { Divider } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',

    ellipsis: true,
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '申请原因',
    dataIndex: 'reason',

    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',

    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handleEdit('edit', record)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => handleEdit('delete', record)}>删除</a>
      </div>
    ),
  },
];
