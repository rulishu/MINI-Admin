import { createSKU, selectAttr, selectSKU, updateSKU } from '@/service/goods/productManage';
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
    attrOptions: [],
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
          SKUtype = 'add';
        }
        yield put({
          type: 'update',
          payload: {
            showSKU: true,
            SKUtype,
            skuList: result,
          },
        });
      }
    },

    *createSKU({ payload }, { call, put }) {
      const { code } = yield call(createSKU, payload);
      if (code === 200) {
        //
        yield put({
          type: 'update',
          payload: {
            showSKU: false,
            queryInfo: {},
            skuList: [],
          },
        });
      }
    },
    *updateSKU({ payload }, { call, put }) {
      const { code } = yield call(updateSKU, payload);
      if (code === 200) {
        //
        yield put({
          type: 'update',
          payload: {
            showSKU: false,
            queryInfo: {},
            skuList: [],
          },
        });
      }
    },
    *selectAttr(_, { call, put }) {
      const { code, result } = yield call(selectAttr, {});
      if (code === 200) {
        yield put({
          type: 'update',
          payload: {
            attrOptions: result,
          },
        });
      }
    },
  },
};
