export default {
  namespace: 'afterSalesAuditPassed',
  state: {
    /** add新增 / edit编辑 / view查看  */
    type: '',
    // 详情弹框
    detailVisible: false,
    // 退款详情弹窗
    visible: false,
    // 退款弹窗
    refundVisible: false,
    // 退款详情
    refundInfo: {},
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
