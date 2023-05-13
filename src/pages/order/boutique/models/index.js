export default {
  namespace: 'boutique',
  state: {
    /** add新增 / edit编辑 / view查看  */
    type: '',
    /** 详情数据  */
    queryInfo: {},
    /** 分页选择框  */
    select: {
      selectedRowKeys: [],
      selectedRows: [],
    },
    /** 是否刷新分页  */
    reload: false,
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
