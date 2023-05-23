export const columns = (edit) => [
  {
    title: '总部分润系数',
    dataIndex: 'percent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '操作',
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
    properties: {
      percent: {
        title: '分润系数',
        type: 'number',
        max: 100,
        placeholder: '请输入会员分润系数',
        required: true,
        defaultValue: queryData.percent,
        props: {
          addonAfter: '%',
        },
      },
    },
  };
};
