export default {
  namespace: 'commentManager',
  state: {
    dataSource: [],
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
