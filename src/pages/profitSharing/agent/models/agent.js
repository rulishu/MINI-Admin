import { edit } from '@/service/profitSharing/agent';

export default {
  namespace: 'agent',
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
    *edit({ payload }, { call, put }) {
      const { areaLevelPercent, cityLevelPercent, provinceLevelPercent, totalPercent, callback } =
        payload;
      const { code } = yield call(edit, {
        areaLevelPercent,
        cityLevelPercent,
        provinceLevelPercent,
        totalPercent,
        configType: 6,
      });
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
