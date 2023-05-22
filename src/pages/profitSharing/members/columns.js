export const columns = (edit) => [
  {
    title: '分润基数',
    align: 'left',
    dataIndex: 'totalPercent',
    width: 30,
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '县/区比例',
    align: 'left',
    dataIndex: 'areaLevelPercent',
    width: 30,
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '市级会员',
    align: 'left',
    dataIndex: 'cityLevelPercent',
    width: 30,
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '省级会员',
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
        title: '会员分润系数',
        type: 'number',
        placeholder: '请输入会员分润系数',
        required: true,
        defaultValue: queryData.totalPercent,
        max: 100,
        props: {
          addonAfter: '%',
        },
      },
      areaLevelPercent: {
        title: '县/区比例',
        type: 'number',
        placeholder: '请输入县/区比例系数',
        required: true,
        defaultValue: queryData.areaLevelPercent,
        max: 100,
        props: {
          addonAfter: '%',
        },
      },
      cityLevelPercent: {
        title: '市比例',
        type: 'number',
        placeholder: '请输入市比例系数',
        required: true,
        defaultValue: queryData.cityLevelPercent,
        max: 100,
        props: {
          addonAfter: '%',
        },
      },
      provinceLevelPercent: {
        title: '省比例',
        type: 'number',
        placeholder: '请输入省比例系数',
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
