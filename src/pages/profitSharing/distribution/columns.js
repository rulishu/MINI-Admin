export const columns = (edit) => [
  {
    title: '经销商等级',
    align: 'left',
    dataIndex: 'totalPercent',
    width: 30,
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '自购比例',
    align: 'left',
    dataIndex: 'areaLevelPercent',
    width: 30,
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '一级返佣',
    align: 'left',
    dataIndex: 'cityLevelPercent',
    width: 30,
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '二级返佣',
    align: 'left',
    dataIndex: 'provinceLevelPercent',
    width: 30,
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '操作',
    width: 30,
    fixed: 'right',
    align: 'center',
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
          addonBefore: '%',
        },
      },
      cityLevelPercent: {
        title: '一级返佣',
        type: 'number',
        required: true,
        defaultValue: queryData.cityLevelPercent,
        max: 100,
        props: {
          addonBefore: '%',
        },
      },
      provinceLevelPercent: {
        title: '二级返佣',
        type: 'number',
        required: true,
        defaultValue: queryData.provinceLevelPercent,
        max: 100,
        props: {
          addonBefore: '%',
        },
      },
    },
  };
};
