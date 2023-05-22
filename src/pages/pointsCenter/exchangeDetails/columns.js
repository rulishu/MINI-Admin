import moment from 'moment';

export const columns = [
  {
    title: '流水号	',
    dataIndex: 'id',

    ellipsis: true,
    width: 30,
  },
  {
    title: '用户名称',
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
    title: '兑换商品',
    dataIndex: 'allPrice',

    ellipsis: true,
    width: 30,
  },
  {
    title: '商品类型',
    dataIndex: 'type',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },

  {
    title: '兑换积分',
    dataIndex: 'num',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '优惠码',
    dataIndex: 'rq',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '兑换时间',
    dataIndex: 'time',

    ellipsis: true,
    width: 30,
    hideInSearch: true,
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    valueType: 'dateRange',
  },
  {
    title: '状态',
    dataIndex: 'state',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
];
