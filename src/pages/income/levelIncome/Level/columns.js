import { Divider } from 'antd';

export const columns = [
  {
    title: '等级',
    dataIndex: 'type',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '优先级',
    dataIndex: 'it',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '收益方式',
    dataIndex: 'time',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '一级',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '二级',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '三级',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '自己收益方式',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '自己',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '级差比例',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '有效期',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '个性海报',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
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
        <Divider type="vertical" />
        <a type="link" size="small">
          考核设置
        </a>
      </div>
    ),
  },
];
