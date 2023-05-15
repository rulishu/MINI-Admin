import { orderStatusEnum } from './enum';

export const columns = (handle) => [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    align: 'center',
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '公司名称',
    dataIndex: 'companyName',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    align: 'center',
  },
  {
    title: '异常原因',
    dataIndex: 'resultParam',
    align: 'center',
    hideInSearch: true,
    render: (text) => <span style={{ color: 'red' }}>{text.message || '-'}</span>,
  },
  {
    title: '下单时间',
    dataIndex: 'createTime',
    align: 'center',
    valueType: 'date',
  },
  {
    title: '收货人',
    dataIndex: 'consignee',
    align: 'center',
  },
  {
    title: '数量',
    dataIndex: 'preferentialAmount',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单金额',
    dataIndex: 'orderPrice',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    align: 'center',
    valueType: 'select',
    valueEnum: orderStatusEnum,
  },
  {
    title: '操作',
    width: 150,
    fixed: 'right',
    align: 'center',
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
