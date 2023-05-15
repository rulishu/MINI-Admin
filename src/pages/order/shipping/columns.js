import { Divider } from 'antd';

export const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    valueType: 'dateTimeRange',
    hideInTable: true,
  },
  {
    title: '记录编号',
    dataIndex: 'goods',
    width: 150,
    hideInSearch: true,
    align: 'left',
  },
  {
    title: '发货类型',
    dataIndex: 'goods',
    hideInSearch: true,
    width: 100,
    align: 'center',
  },
  {
    title: '文件名称',
    dataIndex: 'goods',
    width: 100,
    hideInSearch: true,
    align: 'center',
  },
  {
    title: '操作时间',
    dataIndex: 'goods',
    hideInSearch: true,
    width: 100,
    align: 'center',
  },
  {
    title: '类型',
    hideInSearch: true,
    dataIndex: 'createName',
    align: 'center',
    width: 50,
  },
  {
    title: '操作人',
    dataIndex: 'mes',
    hideInSearch: true,
    align: 'center',
    width: 90,
  },
  {
    title: '记录总数',
    hideInSearch: true,
    dataIndex: 'createTime',
    align: 'center',
    width: 90,
  },
  {
    title: '成功数',
    dataIndex: 'updateName',
    hideInSearch: true,
    align: 'center',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'answerContent',
    align: 'center',
    width: 120,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
      1: { text: '待处理' },
      2: { text: '成功' },
      3: { text: '失败' },
      4: { text: '部分成功' },
    },
  },
  {
    title: '描述',
    dataIndex: 'updateTime',
    align: 'center',
    hideInSearch: true,
    width: 90,
  },
  {
    title: '操作',
    width: 180,
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a>下载上传文件</a>
        <Divider type="vertical" />
        <a>明细</a>
      </div>
    ),
  },
];
