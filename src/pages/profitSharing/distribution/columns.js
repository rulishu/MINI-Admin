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
      level: {
        title: '经销商等级',
        type: 'string',
        placeholder: '请输入会员分润系数',
        required: true,
        hidden: true,
        defaultValue: queryData.level,
        disabled: true,
      },
      liveName: {
        title: '经销商等级',
        type: 'string',
        placeholder: '请输入会员分润系数',
        required: true,
        defaultValue: queryData.liveName,
        disabled: true,
      },
      percent: {
        title: '自购比例',
        type: 'number',
        required: true,
        defaultValue: queryData.percent,
        max: 100,
        props: {
          addonAfter: '%',
        },
      },
      onePercent: {
        title: '一级返佣',
        type: 'number',
        required: true,
        defaultValue: queryData.oneLevelPercent,
        max: 100,
        hidden: queryData.level === 1,
        props: {
          addonAfter: '%',
        },
      },
      twoPercent: {
        title: '二级返佣',
        type: 'number',
        required: true,
        defaultValue: queryData.twoLevelPercent,
        max: 100,
        hidden: queryData.level === 1 || queryData.level === 2,
        props: {
          addonAfter: '%',
        },
      },
    },
  };
};
