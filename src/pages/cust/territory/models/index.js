import { getTreeList } from '@/service/commonInterface';
import { selectByAgentArea, selectByAgentCompany } from '@/service/cust/territory';

export default {
  namespace: 'territory',
  state: {
    videoVisible: false,
    videoData: {},
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
            areaList: result || [],
          },
        });
        callback?.();
      }
    },
    // eslint-disable-next-line no-empty-pattern
    *getTreeList({ callback }, { call, put }) {
      const { code, result = [] } = yield call(getTreeList);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            areaList: result,
          },
        });
        callback?.();
      }
    },
  },
};
