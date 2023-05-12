export default {
  namespace: 'productManage',
  state: {
    /** tabbar activeKey  */
    tabs: 2,
    /** table activeKey  */
    activeKey: '1',
    /** 是否打开form表单  */
    showForm: false,
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
