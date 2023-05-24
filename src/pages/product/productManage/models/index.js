import {
  createSKU,
  getAllTemplateId,
  selectAttr,
  selectSKU,
  updateSKU,
} from '@/service/goods/productManage';
export default {
  namespace: 'productManage',
  state: {
    /** table activeKey  */
    activeKey: '4',
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
    editType: 'add',
    attrOptions: [],

    modalData: { groundType: 1 },
    isModalOpen: false,

    templateIdList: [],
    itemSkuVos: [],
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
      console.log('result: ', result);
      if (code === 200) {
        yield put({
          type: 'update',
          payload: {
            showSKU: true,
            // itemSkuVos: result,
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
            itemSkuVos: [],
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
            itemSkuVos: [],
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

    *getAllTemplateId(_, { call, put }) {
      const { code, result } = yield call(getAllTemplateId);
      if (code === 200) {
        yield put({
          type: 'update',
          payload: {
            templateIdList: result || [],
          },
        });
      }
    },
  },
};
