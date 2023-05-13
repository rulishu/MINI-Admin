import { createSKU, selectSKU, updateSKU } from '@/service/productManage';
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

    showSKU: false,
    SKUtype: 'add',
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *selectSKU({ payload }, { call, put }) {
      const { code, result } = yield call(selectSKU, { id: payload });
      if (code === 200) {
        let SKUtype = 'add';
        if (result && result.length > 0) {
          //
          SKUtype = 'edit';
        } else {
          //
        }
        yield put({
          type: 'update',
          payload: {
            showSKU: true,
            SKUtype,
          },
        });
      }
    },

    *createSKU({ payload }, { call, put, select }) {
      const productManage = yield select(({ productManage }) => productManage);
      const { queryInfo } = productManage;

      const { code } = yield call(createSKU, { payload, id: queryInfo?.id });
      if (code === 200) {
        //
        yield put({
          type: 'update',
          payload: {
            showSKU: false,
            queryInfo: {},
          },
        });
      }
    },
    *updateSKU({ payload }, { call, put, select }) {
      const productManage = yield select(({ productManage }) => productManage);
      const { queryInfo } = productManage;

      const { code } = yield call(updateSKU, { payload, id: queryInfo?.id });
      if (code === 200) {
        //
        yield put({
          type: 'update',
          payload: {
            showSKU: false,
            queryInfo: {},
          },
        });
      }
    },
  },
};
