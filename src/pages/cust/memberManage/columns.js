export const columns = (handleEdit) => [
  {
    title: '会员编号',
    dataIndex: 'id',
    align: 'center',
    width: 90,
    hideInSearch: true,
  },
  {
    title: '公司名称',
    dataIndex: 'companyName',
    align: 'center',
    width: 90,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    align: 'center',
    width: 90,
    hideInSearch: true,
  },
  {
    title: '会员类型',
    dataIndex: 'memberType',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '到期时间',
    dataIndex: 'expirationTime',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '开通时间',
    dataIndex: 'openTime',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 140,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('view', record)}>
          详情
        </a>
        {/* <Divider type="vertical" />
        <a
          type="link"
          size="small"
        // onClick={() => handleEdit('edit', record)}
        >
          加标签
        </a> */}
      </div>
    ),
  },
];
export const schema = ({ queryData }) => {
  return {
    type: 'object',
    displayType: 'row',
    properties: {
      input1: {
        title: '商品名称',
        type: 'string',
        widget: 'input',
        defaultValue: queryData.companyName,
      },
      input2: {
        title: '手机号',
        type: 'string',
        widget: 'input',
        defaultValue: queryData.phone,
      },
      input3: {
        title: '会员类型',
        type: 'string',
        widget: 'input',
        defaultValue: queryData.memberType,
      },
      input4: {
        title: '金额',
        type: 'string',
        widget: 'input',
        defaultValue: queryData.payPrice,
      },
      input5: {
        title: '开通时间',
        type: 'string',
        widget: 'input',
        defaultValue: queryData.openTime,
      },
      input6: {
        title: '到期时间',
        type: 'string',
        widget: 'input',
        defaultValue: queryData.expirationTime,
      },
    },
  };
};
