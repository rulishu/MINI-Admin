export default {
  namespace: 'abnormal',
  state: {
    /** add新增 / edit编辑 / view查看  */
    type: '',
    /** 详情弹窗  */
    visible: false,
    /** 详情数据  */
    queryData: {},
    /** 是否刷新分页  */
    reload: false,
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
