export default {
  namespace: 'packManagement',
  state: {
    visible: false,
    /** add新增 / edit编辑 / view查看  */
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
