import { Divider } from 'antd';

export const columns = [
  {
    title: '用户信息',
    dataIndex: 'it1',

    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '变更前',
    dataIndex: 'it2',

    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '变更后',
    dataIndex: 'it3',

    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '上级信息',
    dataIndex: 'it4',

    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '附件图片',
    dataIndex: 'it5',

    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '协议',
    dataIndex: 'it6',

    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '审核状态',
    dataIndex: 'it7',

    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '审核人',
    dataIndex: 'it8',

    ellipsis: true,
    width: 30,
    hideInSearch: true,
  },
  {
    title: '审核类型',
    dataIndex: 'type',

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
    dataIndex: 'it9',

    ellipsis: true,
    width: 30,
    valueType: 'dateRange',
  },
  {
    title: '审核时间',
    dataIndex: 'it10',

    ellipsis: true,
    width: 30,
    valueType: 'dateRange',
    hideInSearch: true,
  },
  {
    title: '申请人信息',
    dataIndex: 'it11',

    ellipsis: true,
    width: 30,
    hideInTable: true,
  },
  {
    title: '审核人信息',
    dataIndex: 'it12',

    ellipsis: true,
    width: 30,
    hideInTable: true,
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',

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
