export default {
  namespace: 'territory',
  state: {
    visible: false,
    /** add新增 / edit编辑 / view查看  */
    type: '',
    queryInfo: {},
    relaod: false,
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
