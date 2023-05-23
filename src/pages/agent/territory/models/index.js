import { selectByAgentArea, selectByAgentCompany } from '@/service/agent/territory';
import { convertTreeList } from '@/utils';

export default {
  namespace: 'territory',
  state: {
    visible: false,
    /** add新增 / edit编辑 / view查看  */
    type: '',
    queryInfo: {},
    relaod: false,
    companyList: [],
    areaList: [],
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *selectByAgentCompany({ payload }, { call, put }) {
      const { code, result } = yield call(selectByAgentCompany, payload);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            companyList: (result || []).map((item) => ({
              label: item.companyName,
              value: item.id,
            })),
          },
        });
      }
    },
    *selectByAgentArea({ payload, callback }, { call, put }) {
      const { code, result } = yield call(selectByAgentArea, payload);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            areaList:
              (result && convertTreeList(result, { label: 'areaName', value: 'areaId' })) || [],
          },
        });
        callback?.();
      }
    },
  },
};
