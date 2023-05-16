import { Divider } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    width: 80,
    ellipsis: true,
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '供应商名称',
    width: 120,
    dataIndex: 'name',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '联系人',
    width: 120,
    dataIndex: 'name1',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '联系方式',
    width: 120,
    dataIndex: 'phone',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '地址',
    width: 120,
    dataIndex: 'address',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '注册资本',
    width: 120,
    dataIndex: 'price',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '推荐人',
    width: 120,
    dataIndex: 'contract',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '推荐人账号',
    width: 120,
    dataIndex: 'businessLicense',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    fixed: 'right',
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
