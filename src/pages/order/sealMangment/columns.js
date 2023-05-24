import { Divider } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'orderNumber',
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '商品分组',
    dataIndex: 'group',
  },
  {
    title: '订单编号',
    dataIndex: 'order_number',
  },
  {
    title: '已支付金额',
    dataIndex: 'paid_amount',
    hideInSearch: true,
  },
  {
    title: '封坛数量',
    dataIndex: 'sealed_number',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '封坛期限(月/坛)',
    dataIndex: 'sealed_term',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '客户名称',
    dataIndex: 'customer_name',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '手机号码',
    dataIndex: 'phone_number',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '操作',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handleEdit('edit', record)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => handleEdit('delete', record)}>删除</a>
      </div>
    ),
  },
];
