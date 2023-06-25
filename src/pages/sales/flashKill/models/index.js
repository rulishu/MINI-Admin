export default {
  namespace: 'flashKill',
  state: {
    visible: false,
    /** add新增 / edit编辑  */
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
