export default {
  namespace: 'storeConfig',
  state: {
    visible: false,
    queryInfo: {},
    type: '',
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
