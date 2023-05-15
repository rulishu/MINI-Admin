export default {
  namespace: 'tagsManage',
  state: {
    visible: false,
    activeKey: 'tab1',
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
