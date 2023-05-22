import { level } from './config';

// percent  自购比例
// configType 分润类型
// level 层级1一级2二级3奋斗者
// oneLevelPercent 一级分销商返佣比
// twoLevelPercent 二级分销商返佣比
// threeLevelPercent 三级(奋斗者)分销商返佣比
export const columns = (edit) => [
  {
    title: '经销商等级',
    align: 'left',
    dataIndex: 'level',
    render: (record) => {
      return <div>{level[record]?.toString()}</div>;
    },
  },
  {
    title: '自购比例',
    align: 'left',
    dataIndex: 'percent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  // {
  //   title: '分润类型',
  //   align: 'left',
  //   dataIndex: 'configType',
  //   render: (record) => {
  //     return <div>{record}</div>;
  //   },
  // },
  {
    title: '一级返佣',
    align: 'left',
    dataIndex: 'oneLevelPercent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '二级返佣',
    align: 'left',
    dataIndex: 'twoLevelPercent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '三级返佣',
    align: 'left',
    dataIndex: 'threeLevelPercent',
    render: (record) => {
      return <div>{record}%</div>;
    },
  },
  {
    title: '操作',
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
