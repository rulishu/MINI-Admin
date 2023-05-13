export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'orderNumber',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '公司名称',
    dataIndex: 'itemName',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    align: 'center',
    ellipsis: true,
    width: 80,
  },
  {
    title: '商品金额',
    dataIndex: 'orderPrice',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '商品数量',
    dataIndex: 'sum',
    align: 'center',
    ellipsis: true,
    width: 80,
    hideInSearch: true,
  },
  {
    title: '售后申请时间',
    dataIndex: 'searchTime',
    align: 'center',
    ellipsis: true,
    valueType: 'date',
    width: 150,
    hideInTable: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    ellipsis: true,
    width: 150,
    valueType: 'select',
    valueEnum: {
      1: '审核通过',
      2: '审核拒绝',
    },
    hideInTable: true,
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    align: 'center',
    ellipsis: true,
    valueType: 'date',
    width: 150,
  },
  {
    title: '操作',
    width: 80,
    align: 'center',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('view', record)}>
          查看详情
        </a>
      </div>
    ),
  },
];
