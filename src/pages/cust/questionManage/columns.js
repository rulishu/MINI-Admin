import { Divider } from 'antd';

export const columns = [
  {
    title: '商品',
    dataIndex: 'goods',
    hideInSearch: true,

    width: 50,
    ellipsis: true,
  },
  {
    title: '商品名称',
    dataIndex: 'goods',
    hideInTable: true,
    ellipsis: true,
  },
  {
    title: '发问人',
    dataIndex: 'createName',

    width: 50,
  },
  {
    title: '问题内容',
    dataIndex: 'mes',

    ellipsis: true,
    width: 90,
  },
  {
    title: '发问时间',
    dataIndex: 'createTime',

    width: 90,
  },
  {
    title: '回答人',
    dataIndex: 'updateName',

    width: 50,
  },
  {
    title: '回答内容',
    dataIndex: 'answerContent',

    ellipsis: true,
    width: 120,
  },
  {
    title: '回答时间',
    dataIndex: 'updateTime',

    width: 90,
  },
  {
    title: '操作',
    width: 180,

    hideInSearch: true,
    render: () => (
      <div>
        <a>删除</a>
        <Divider type="vertical" />
        <a>编辑</a>
      </div>
    ),
  },
];
