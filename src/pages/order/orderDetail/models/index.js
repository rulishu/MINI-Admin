import { getInfoPushList, selectById, update } from '@/service/order/orderDetail';

export default {
  namespace: 'orderDetail',
  state: {
    /** 详情数据  */
    queryData: {},
    pushList: [], // 包裹信息
    id: null,
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *selectById({ payload }, { call, put }) {
      const { code, result } = yield call(selectById, payload);
      if (code === 200) {
        yield put({
          type: 'getInfoPushList',
          payload: {
            id: payload.id,
          },
        });
        yield put({
          type: 'update',
          payload: {
            queryData: result,
            visible: true,
          },
        });
      }
    },
    *getInfoPushList({ payload }, { call, put }) {
      const { code, result } = yield call(getInfoPushList, payload);
      if (code === 200) {
        yield put({
          type: 'update',
          payload: {
            pushList: result || [],
          },
        });
      }
    },
    *updateInfo({ payload, callback }, { call }) {
      const { code } = yield call(update, payload);
      if (code === 200) {
        callback?.();
      }
    },
  },
};
