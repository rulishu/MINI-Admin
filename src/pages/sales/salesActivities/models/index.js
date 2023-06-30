import { deleteCoupon, getDetails, updateCouponStatus } from '@/service/sales/coupon';
import { message } from 'antd';
import dayjs from 'dayjs';

export default {
  namespace: 'salesActivities',
  state: {
    visible: false,
    /** add新增 / edit编辑  */
    type: '',
    queryInfo: {},
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *getDetails({ payload }, { call, put }) {
      const { code, result } = yield call(getDetails, payload);
      if (code === 200 && result) {
        let obj = {};
        const {
          collectBeginDate,
          collectEndDate,
          useBeginDate,
          useEndTime,
          effectiveDuration,
          minimumConsumption,
          price,
          ...others
        } = result;
        if (collectBeginDate && collectEndDate) {
          obj.collectDate = [collectBeginDate, collectEndDate];
        }
        if (result?.useTimeType === 1 && useBeginDate && useEndTime) {
          obj.useTimeRange = [dayjs(useBeginDate), dayjs(useEndTime)];
        }
        if (result?.useTimeType === 2 && effectiveDuration) {
          obj.useTimeRange = effectiveDuration;
        }
        obj.minandsale = {
          first: minimumConsumption,
          second: price,
        };
        yield put({
          type: 'update',
          payload: {
            queryInfo: { ...result, ...obj, ...others },
            visible: true,
          },
        });
      }
    },

    *deleteCoupon({ payload }, { call }) {
      const { code } = yield call(deleteCoupon, payload);
      if (code === 200) {
        payload?.callback();
        message.success('删除成功');
      }
    },
    *updateCouponStatus({ payload }, { call }) {
      const { code } = yield call(updateCouponStatus, payload);
      if (code === 200) {
        payload?.callback();
        message.success('失效成功');
      }
    },
  },
};
