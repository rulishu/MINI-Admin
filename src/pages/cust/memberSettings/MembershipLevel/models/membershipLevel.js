export default {
  namespace: 'membershipLevel',
  state: {
    tabs: '1',
    activeKey: '1',
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
