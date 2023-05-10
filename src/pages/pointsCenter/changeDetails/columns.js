import moment from 'moment';

export const columns = [
  {
    title: '会员编号',
    dataIndex: 'id',
    align: 'center',
    ellipsis: true,
    width: 30,
  },
  {
    title: '用户昵称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true,
    width: 30,
  },
  {
    title: '用户头像	',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    align: 'center',
    ellipsis: true,
    width: 30,
  },
  {
    title: '变更事由',
    dataIndex: 'allPrice',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '变动明细	',
    dataIndex: 'balance',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '变动时间',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    width: 30,
    // hideInSearch: true,
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    valueType: 'dateRange',
  },
];
