import { getTreeList, getUserList } from '@/service/goods/supplier';

export default {
  namespace: 'supplier',
  state: {
    visible: false,
    /** add新增 / edit编辑 / view查看  */
    type: '',
    queryInfo: {},
    relaod: false,
    treeList: [],
    userList: [],
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    // eslint-disable-next-line no-unused-vars
    *getTreeList({ payload }, { call, put }) {
      const { code, result } = yield call(getTreeList);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            treeList: result,
          },
        });
      }
    },
    *getUserList({ payload }, { call, put }) {
      const { code, result } = yield call(getUserList, payload);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            userList: result.records || [],
          },
        });
      }
    },
  },
};
