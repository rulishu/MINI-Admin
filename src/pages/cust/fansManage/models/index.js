export default {
  namespace: 'fansManage',
  state: {
    type: '',
    visible: false,
    queryData: {},
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
