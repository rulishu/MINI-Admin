import { orderStatusEnum } from './enum';

export const columns = (handle) => [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,

    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '公司名称',
    dataIndex: 'companyName',

    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
  },
  {
    title: '异常原因',
    dataIndex: 'resultParam',

    hideInSearch: true,
    render: (text) => <span style={{ color: 'red' }}>{text.message || '-'}</span>,
  },
  {
    title: '下单时间',
    dataIndex: 'createTime',

    valueType: 'date',
  },
  {
    title: '收货人',
    dataIndex: 'consignee',
  },
  {
    title: '数量',
    dataIndex: 'preferentialAmount',

    hideInSearch: true,
  },
  {
    title: '订单金额',
    dataIndex: 'orderPrice',

    hideInSearch: true,
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',

    valueType: 'select',
    valueEnum: orderStatusEnum,
  },
  {
    title: '操作',
    width: 150,
    fixed: 'right',

    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handle('view', record)}>
          详情
        </a>
        {/* <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handle('upload', record)}>
          上传单号
        </a> */}
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
