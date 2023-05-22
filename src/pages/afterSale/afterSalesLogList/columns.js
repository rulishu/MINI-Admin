import { auditStatusEnum } from './enum';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',

    ellipsis: true,
    width: 80,
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '公司名称',
    dataIndex: 'itemName',

    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',

    ellipsis: true,
    width: 80,
  },
  {
    title: '商品金额',
    dataIndex: 'orderPrice',

    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '商品数量',
    dataIndex: 'sum',

    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '售后申请时间',
    dataIndex: 'searchTime',

    ellipsis: true,
    valueType: 'date',
    width: 150,
    hideInTable: true,
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',

    ellipsis: true,
    valueType: 'date',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '审核状态',
    dataIndex: 'status',

    ellipsis: true,
    width: 150,
    valueType: 'select',
    valueEnum: auditStatusEnum,
  },
  {
    title: '操作',
    width: 80,

    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handleEdit('view', record)}>详情</a>
      </div>
    ),
  },
];
