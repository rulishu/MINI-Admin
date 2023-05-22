import moment from 'moment';

export const columns = [
  {
    title: '会员编号',
    dataIndex: 'id',

    ellipsis: true,
    width: 30,
  },
  {
    title: '用户昵称',
    dataIndex: 'name',

    ellipsis: true,
    width: 30,
  },
  {
    title: '用户头像	',
    dataIndex: 'type',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '手机号码',
    dataIndex: 'phone',

    ellipsis: true,
    width: 30,
  },
  {
    title: '变更事由',
    dataIndex: 'allPrice',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '变动明细	',
    dataIndex: 'balance',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '变动时间',
    dataIndex: 'time',

    ellipsis: true,
    width: 30,
    // hideInSearch: true,
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    valueType: 'dateRange',
  },
];
