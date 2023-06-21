export default {
  namespace: 'userDetail',
  state: {
    editType: '',
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
