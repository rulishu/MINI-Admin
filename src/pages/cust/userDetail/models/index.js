import { edit, info } from '@/service/cust/userDetail';

export default {
  namespace: 'userDetail',
  state: {
    queryData: {},
    editData: {},
    editModalVisible: false,
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *info({ payload }, { call, put }) {
      const { code, result } = yield call(info, payload);
      if (code === 200) {
        yield put({
          type: 'update',
          payload: {
            queryData: result,
          },
        });
      }
    },
    *edit({ payload }, { call, put }) {
      const { code } = yield call(edit, payload);
      if (code === 200) {
        yield put({
          type: 'update',
          payload: { editModalVisible: false },
        });
        yield put({
          type: 'info',
          payload: { id: payload?.id },
        });
      }
    },
  },
};
