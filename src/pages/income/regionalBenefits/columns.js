import { Divider, Popconfirm } from 'antd';

export const columns = [
  {
    title: '会员编号',
    dataIndex: 'id',
    hideInSearch: true,
    ellipsis: true,
    align: 'center',
    width: 30,
  },
  {
    title: '微信昵称',
    dataIndex: 'name',
    align: 'center',
    hideInSearch: true,
    width: 30,
  },
  {
    title: '微信头像',
    dataIndex: 'avatar',
    align: 'center',
    hideInSearch: true,
    width: 30,
  },
  {
    title: '等级',
    dataIndex: 'level',
    align: 'center',
    hideInSearch: true,
    width: 30,
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '区域',
    dataIndex: 'region',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '分佣',
    dataIndex: 'commission',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '操作',
    width: 30,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small">
          修改
        </a>
        <Divider type="vertical" />
        <Popconfirm
          title="权益规则删除"
          description="删除后无法恢复规则，确认要删除该权益规则吗"
          okText="确定"
          cancelText="取消"
        >
          <a type="link" size="small">
            删除
          </a>
        </Popconfirm>
      </div>
    ),
  },
];

export const columnspro = [
  {
    title: '商品名称',
    dataIndex: 'id',
    hideInSearch: true,
    align: 'center',
    width: 30,
  },
  {
    title: '商品图片',
    dataIndex: 'avatar',
    align: 'center',
    valueType: 'avatar',
    hideInSearch: true,
    width: 60,
  },
  {
    title: '原价价格',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '指定价格',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '省级',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '市级',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '区县',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '操作',
    width: 30,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small">
          修改
        </a>
        <Divider type="vertical" />
        <Popconfirm
          title="权益规则删除"
          description="删除后无法恢复规则，确认要删除该权益规则吗"
          okText="确定"
          cancelText="取消"
        >
          <a type="link" size="small">
            删除
          </a>
        </Popconfirm>
      </div>
    ),
  },
];

export const columnsRecord = [
  {
    title: '订单号',
    dataIndex: 'id',
    align: 'center',
    valueType: 'avatar',
    hideInSearch: true,
    width: 100,
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    hideInSearch: true,
    align: 'center',
    width: 100,
  },
  {
    title: '收益人名称',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '收益人等级',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '收益人编号',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '订单结算金额',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '收益时间',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '收益比例',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '佣金',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '状态',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
];
