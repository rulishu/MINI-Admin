import { Divider } from 'antd';

export const columns = [
  {
    title: '用户信息',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '变更前',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '变更后',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '上级信息',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '附件图片',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '协议',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '审核状态',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '审核人',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '审核类型',
    dataIndex: 'type',
    align: 'center',
    width: 30,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长' },
      1: { text: '平台审核' },
      2: { text: '上级审核' },
    },
  },
  {
    title: '申请时间',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    valueType: 'dateRange',
  },
  {
    title: '审核时间',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    valueType: 'dateRange',
    hideInSearch: true,
  },
  {
    title: '申请人信息',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInTable: true,
  },
  {
    title: '审核人信息',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInTable: true,
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small">
          修改
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          删除
        </a>
      </div>
    ),
  },
];
