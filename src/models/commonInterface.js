import { getTreeList } from '@/service/commonInterface';

const convert = (data) => {
  return data.map((item) => {
    const { areaCode, areaName } = item;
    const newChildren = item.children ? convert(item.children) : [];
    return {
      label: areaName,
      value: areaCode,
      children: newChildren,
    };
  });
};

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
      const { code, result = [] } = yield call(getTreeList);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            treeList: convert(result),
          },
        });
      }
    },
  },
};
