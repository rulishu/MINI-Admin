export const columns = (edit) => [
  {
    title: '推荐人分润系数',
    align: 'left',
    dataIndex: 'percent',
    width: 30,
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '操作',
    width: 30,
    fixed: 'right',

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
      input: {
        title: '推荐人分润系数',
        type: 'number',
        placeholder: '请输入推荐人分润系数',
        required: true,
        defaultValue: queryData.percent,
        max: 100,
        min: 0,
        props: {
          addonAfter: '%',
        },
      },
    },
  };
};
