export const columns = (edit) => [
  {
    title: '经销商等级',
    align: 'left',
    dataIndex: 'totalPercent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '自购比例',
    align: 'left',
    dataIndex: 'areaLevelPercent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '一级返佣',
    align: 'left',
    dataIndex: 'cityLevelPercent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '二级返佣',
    align: 'left',
    dataIndex: 'provinceLevelPercent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '操作',
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
      totalPercent: {
        title: '经销商等级',
        type: 'string',
        placeholder: '请输入会员分润系数',
        required: true,
        defaultValue: queryData.totalPercent,
        disabled: true,
      },
      areaLevelPercent: {
        title: '自购比例',
        type: 'number',
        required: true,
        defaultValue: queryData.areaLevelPercent,
        max: 100,
        props: {
          addonAfter: '%',
        },
      },
      cityLevelPercent: {
        title: '一级返佣',
        type: 'number',
        required: true,
        defaultValue: queryData.cityLevelPercent,
        max: 100,
        props: {
          addonAfter: '%',
        },
      },
      provinceLevelPercent: {
        title: '二级返佣',
        type: 'number',
        required: true,
        defaultValue: queryData.provinceLevelPercent,
        max: 100,
        props: {
          addonAfter: '%',
        },
      },
    },
  };
};
