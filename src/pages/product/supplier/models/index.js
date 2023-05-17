import { getUserList } from '@/service/goods/supplier';

export default {
  namespace: 'supplier',
  state: {
    visible: false,
    /** add新增 / edit编辑 / view查看  */
    type: '',
    queryInfo: {},
    relaod: false,
    userList: [],
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *getUserList({ payload }, { call, put }) {
      const { code, result } = yield call(getUserList, payload);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            userList: result || [],
          },
        });
      }
    },
  },
};
