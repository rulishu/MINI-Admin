export default {
  namespace: 'userDetail',
  state: {
    queryData: {},
    editData: {},
    editModalVisible: false,
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
