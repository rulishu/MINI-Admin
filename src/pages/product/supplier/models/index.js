import { getAllSuppliers, getUserList } from '@/service/goods/supplier';

export default {
  namespace: 'supplier',
  state: {
    visible: false,
    /** add新增 / edit编辑 / view查看  */
    type: '',
    queryInfo: {},
    relaod: false,
    userList: [],
    suppliersList: [],
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    // eslint-disable-next-line no-unused-vars
    *getUserList({ payload }, { call, put }) {
      const { code, result } = yield call(getUserList);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            userList: result || [],
          },
        });
      }
    },
    *getAllSuppliers(_, { call, put }) {
      const { code, result } = yield call(getAllSuppliers);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            suppliersList: result || [],
          },
        });
      }
    },
  },
};
