import { edit } from '@/service/profitSharing/members';

export default {
  namespace: 'members',
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
      const { areaLevelPercent, cityLevelPercent, provinceLevelPercent, totalPercent } = payload;
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
