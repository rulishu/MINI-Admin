export default {
  namespace: 'userDetail',
  state: {
    queryData: {},
    editData: {},
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
