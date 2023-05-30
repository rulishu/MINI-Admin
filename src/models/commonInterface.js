import { getEnums, getTreeList } from '@/service/commonInterface';

export default {
  namespace: 'commonInterface',
  state: {
    treeList: [],
    enums: {},
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
      const { code, result = [] } = yield call(getTreeList);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            treeList: result,
          },
        });
      }
    },
    *getDictType({ payload }, { call, put, select }) {
      const { code, result = [] } = yield call(getEnums, payload);
      if (code && code === 200) {
        const { enums } = yield select((state) => state.commonInterface);
        yield put({
          type: 'update',
          payload: {
            enums: {
              ...enums,
              [payload['dictType']]: result,
            },
          },
        });
      }
    },
  },
};
