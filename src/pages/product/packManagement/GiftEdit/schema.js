export default {
  type: 'object',
  properties: {
    select1: {
      title: '店长等级',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: 'VIP奋斗者', value: 'a' },
          { label: '二级经销商', value: 'b' },
          { label: '一级经销商', value: 'c' },
          { label: '县代', value: 'd' },
          { label: '地代', value: 'e' },
          { label: '省分公司', value: 'f' },
        ],
      },
    },
    input2: {
      title: '一级收益比例',
      type: 'string',
    },
    input3: {
      title: '二级收益比例',
      type: 'string',
    },
    input4: {
      title: '三级收益比例',
      type: 'string',
    },
  },
};
