import { Divider } from 'antd';

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '标签类别',
    dataIndex: 'type',
    align: 'center',
    width: 120,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
      1: { text: '付小小' },
      2: { text: '曲丽丽' },
    },
  },
  {
    title: '标签名称',
    dataIndex: 'name',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '客户数',
    dataIndex: 'number',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 180,
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small">
          删除
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          编辑
        </a>
      </div>
    ),
  },
];
