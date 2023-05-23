import { queryDealerDsConfig, updateDealerDsConfig } from '@/service/profitSharing/distribution';
import { configType } from '../config';

export default {
  namespace: 'distribution',
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
    *fetchDealerDsConfig(_, { put }) {
      const { code } = yield queryDealerDsConfig(configType);
      if (code && code === 200) {
        yield put({
          type: 'update',
        });
      }
    },
    *edit({ payload, callback }, { call, put }) {
      const { code } = yield call(updateDealerDsConfig, payload);
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
