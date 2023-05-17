export default {
  namespace: 'questionManage',
  state: {
    visible: false,
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
