export default {
  namespace: 'bannerManage',
  state: {
    tabsActive: '1',
    visible: true,
    /** add新增 / edit编辑 / view查看  */
    type: '',
    queryInfo: {},
    relaod: false,
    dom: {},
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
