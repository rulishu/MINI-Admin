export default {
  namespace: 'bannerManage',
  state: {
    activeKey: 1,
    visible: false,
    /** add新增 / edit编辑  */
    type: '',
    queryInfo: {},
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
