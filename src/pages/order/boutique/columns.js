import { Divider } from 'antd';

export const columns = [
  {
    title: '商品',
    dataIndex: 'level',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '单价(元)/数量',
    dataIndex: 'type',

    hideInSearch: true,
    width: 30,
  },
  {
    title: '销售商',
    dataIndex: 'type',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '维权状态',
    dataIndex: 'it',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },

  {
    title: '发货信息',
    dataIndex: 'num',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '买家/收货人',
    dataIndex: 'num',

    hideInSearch: true,
    width: 30,
  },
  {
    title: '会员信息',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '店长信息',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '配送方式',
    dataIndex: 'num',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
    hideInTable: true,
  },
  {
    title: '运费',
    dataIndex: 'day',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '退换无忧（元）',
    dataIndex: 'type',

    hideInSearch: true,
    width: 30,
  },
  {
    title: '实付金额(元)',
    dataIndex: 'type',

    hideInSearch: true,
    width: 30,
    hideInTable: true,
  },
  {
    title: '优惠金额(元)',
    dataIndex: 'type',

    hideInSearch: true,
    width: 30,
  },
  {
    title: '订单状态 ',
    dataIndex: 'day',

    hideInSearch: true,
    ellipsis: true,
    width: 30,
  },
  {
    title: '标签',
    dataIndex: 'num',

    ellipsis: true,
    hideInSearch: true,
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
          编辑
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          查看
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          复制
        </a>
      </div>
    ),
  },
];
