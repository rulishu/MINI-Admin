export default {
  namespace: 'productParameters',
  state: {
    tab: 'tab1',
    visible: false,
    /** add新增 / edit编辑 / view查看  */
    type: '',
    queryInfo: {},
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
