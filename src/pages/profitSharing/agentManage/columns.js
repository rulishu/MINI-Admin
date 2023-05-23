export const columns = (edit) => [
  {
    title: '代理商等级',
    align: 'left',
    dataIndex: 'liveName',
  },
  {
    title: '发起方分润',
    align: 'left',
    dataIndex: 'sendPercent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '收件方分润',
    align: 'left',
    dataIndex: 'putPercent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '操作',
    align: 'left',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => edit(record)}>
          修改
        </a>
      </div>
    ),
  },
];

export const schema = ({ queryData }) => {
  return {
    type: 'object',
    column: 2,
    properties: {
      liveName: {
        title: '代理商等级',
        type: 'string',
        placeholder: '请输入代理商等级',
        required: true,
        defaultValue: queryData.liveName,
        disabled: true,
      },
      sendPercent: {
        title: '发起方分润',
        placeholder: '请输发起方分润',
        type: 'number',
        required: true,
        defaultValue: queryData.sendPercent,
        props: {
          addonAfter: '%',
        },
      },
      putPercent: {
        title: '收件方分润',
        placeholder: '请输收件方分润',
        type: 'number',
        required: true,
        defaultValue: queryData.putPercent,
        props: {
          addonAfter: '%',
        },
      },
    },
  };
};
