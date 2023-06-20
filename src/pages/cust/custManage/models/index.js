export default {
  namespace: 'custManage',
  state: {
    type: '',
    visible: false,
    editModalVisible: false,
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
