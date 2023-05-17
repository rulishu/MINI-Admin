import { getTreeList } from '@/service/commonInterface';

export default {
  namespace: 'commonInterface',
  state: {
    treeList: [],
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
  },
};
