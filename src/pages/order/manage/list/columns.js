export const columns = (handle) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '公司名称',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '物流单号',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '下单日期',
    dataIndex: 'id',
    align: 'center',
    valueType: 'date',
    // sorter: true,
  },
  {
    title: '收货人',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '数量',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单金额',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单状态',
    dataIndex: 'id',
    align: 'center',
    valueType: 'select',
    valueEnum: {
      1: { text: '待定价' },
      2: { text: '待付款' },
      3: { text: '备货中' },
      4: { text: '待收货' },
      5: { text: '已完成' },
    },
  },
  {
    title: '开票状态',
    dataIndex: 'id',
    align: 'center',
    valueType: 'select',
    valueEnum: {
      1: { text: '未开票' },
      2: { text: '待开票' },
      3: { text: '已开票' },
    },
  },
  {
    title: '操作',
    width: 100,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handle('view', record)}>
          查看详情
        </a>
      </div>
    ),
  },
];

export const schema = ({ queryData }) => {
  return {
    type: 'object',
    displayType: 'row',
    labelWidth: '100%',
    properties: {
      platformName: {
        title: '权益规则名称',
        type: 'string',
        widget: 'input',
        placeholder: '请输入权益规则名称',
        required: true,
        defaultValue: queryData.platformName,
      },
      content: {
        title: '权益规则详情',
        type: 'string',
        widget: 'textArea',
        placeholder: '请输入权益规则详情',
        required: true,
        defaultValue: queryData.content,
      },
    },
  };
};
