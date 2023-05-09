import { Divider } from 'antd';

export const columns = [
  {
    title: '商品',
    dataIndex: 'goods',
    align: 'left',
    width: 120,
  },
  {
    title: '发问人',
    dataIndex: 'createName',
    align: 'left',
    width: 50,
  },
  {
    title: '问题内容',
    dataIndex: 'mes',
    align: 'left',
    width: 90,
  },
  {
    title: '发问时间',
    dataIndex: 'createTime',
    align: 'left',
    width: 90,
  },
  {
    title: '回答人',
    dataIndex: 'updateName',
    align: 'left',
    width: 50,
  },
  {
    title: '回答内容',
    dataIndex: 'answerContent',
    align: 'left',
    width: 120,
  },
  {
    title: '回答时间',
    dataIndex: 'updateTime',
    align: 'left',
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
