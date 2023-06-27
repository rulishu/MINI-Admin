import { Divider } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: '模板名称',
    dataIndex: 'name',
  },
  {
    title: '使用状态',
    dataIndex: 'itemCount',
    search: false,
    render: (_, records) => (records?.itemCount ? `已被${records?.itemCount}个商品使用` : '未使用'),
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    search: false,
  },
  {
    title: '操作',
    fixed: 'right',
    search: false,
    valueType: 'option',
    key: 'option',
    render: (_, record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('copy', record)}>
          复制
        </a>
        <Divider type="vertical" />
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
