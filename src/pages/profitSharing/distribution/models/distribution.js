import { edit, queryDealerDsConfig } from '@/service/profitSharing/distribution';
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
    async fetchDealerDsConfig(_, { call, put }) {
      const { code } = await call(queryDealerDsConfig, { configType });
      if (code && code === 200) {
        await put({
          type: 'update',
        });
      }
    },
    async edit({ payload }, { call, put }) {
      const { areaLevelPercent, cityLevelPercent, provinceLevelPercent, totalPercent, callback } =
        payload;
      const { code } = await call(edit, {
        areaLevelPercent,
        cityLevelPercent,
        provinceLevelPercent,
        totalPercent,
      });
      if (code && code === 200) {
        await put({
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
