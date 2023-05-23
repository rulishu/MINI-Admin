import { edit } from '@/service/profitSharing/referrer';

export default {
  namespace: 'referrer',
  state: {
    tabs: '1',
    activeKey: '1',
    type: '',
    visible: false,
    queryData: {},
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *edit({ payload, callback }, { call, put }) {
      const { code } = yield call(edit, payload);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            visible: false,
          },
        });
        callback();
      }
    },
  },
};
