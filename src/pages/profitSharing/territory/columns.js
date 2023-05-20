import { Divider } from 'antd';
import { status } from './enum';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'left',
    ellipsis: true,
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '代理用户昵称',
    dataIndex: 'name',
    align: 'left',
    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '代理用户手机',
    dataIndex: 'phone',
    align: 'left',
    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '代理等级',
    dataIndex: 'status',
    align: 'left',
    ellipsis: true,
    valueType: 'select',
    valueEnum: status,
  },
  {
    title: '代理地区',
    dataIndex: 'reason2',
    align: 'left',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '代理用户',
    dataIndex: 'reason3',
    align: 'left',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'reason4',
    align: 'left',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    align: 'left',
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
