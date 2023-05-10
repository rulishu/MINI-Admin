import { Divider } from 'antd';

export const columns = [
  {
    title: '商品',
    dataIndex: 'goods',
    hideInSearch: true,
    align: 'center',
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
    align: 'center',
    width: 50,
  },
  {
    title: '问题内容',
    dataIndex: 'mes',
    align: 'center',
    ellipsis: true,
    width: 90,
  },
  {
    title: '发问时间',
    dataIndex: 'createTime',
    align: 'center',
    width: 90,
  },
  {
    title: '回答人',
    dataIndex: 'updateName',
    align: 'center',
    width: 50,
  },
  {
    title: '回答内容',
    dataIndex: 'answerContent',
    align: 'center',
    ellipsis: true,
    width: 120,
  },
  {
    title: '回答时间',
    dataIndex: 'updateTime',
    align: 'center',
    width: 90,
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
