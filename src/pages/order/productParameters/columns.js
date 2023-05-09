import { Divider } from 'antd';

export const columns = () => [
  {
    title: '商品名称',
    dataIndex: 'key1',
    hideInTable: true,
  },
  {
    title: '商品分组',
    dataIndex: 'key2',
    hideInTable: true,
  },
  {
    title: '订单编号',
    dataIndex: 'id',
    fixed: 'left',
    width: 120,
    align: 'center',
  },
  {
    title: '商品',
    dataIndex: 'type',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '距启封天数',
    dataIndex: 'day',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '已支付金额',
    dataIndex: 'moneny',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '封坛数量',
    dataIndex: 'number',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '封坛期限(月/坛)',
    dataIndex: 'month',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '客户名称',
    dataIndex: 'custName',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '收获地址',
    dataIndex: 'address',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 180,
    fixed: 'right',
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
