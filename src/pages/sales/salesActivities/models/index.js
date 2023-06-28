import { createCoupon, getDetails, selectPage } from '@/service/sales/coupon';
import { message } from 'antd';

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
    *selectByPage(_, { call, put, select }) {
      const { searchForm, pageSize, pageNum, activeKey } = yield select(
        (state) => state.salesActivities,
      );

      let status, additionalStatus;
      if (activeKey === '1') {
        status = -1;
      } else if (activeKey === '2') {
        status = 3;
      } else if (activeKey === '3') {
        status = 1;
        additionalStatus = 1;
      } else if (activeKey === '4') {
        status = 1;
        additionalStatus = 2;
      } else if (activeKey === '5') {
        status = 2;
        additionalStatus = 1;
      } else if (activeKey === '6') {
        status = 2;
        additionalStatus = 2;
      } else if (activeKey === '7') {
        status = 6;
      } else if (activeKey === '8') {
        status = 4;
      }

      // let orderStatus; // 订单状态
      // let afterServiceType; //售后类型 1.退款 2退货退款

      // if (afterType === 1) {
      //   orderStatus = 2;
      //   afterServiceType = 1;
      // }
      // if (afterType === 2) {
      //   orderStatus = 3;
      //   afterServiceType = 1;
      // }
      // if (afterType === 3) {
      //   orderStatus = 3;
      //   afterServiceType = 2;
      // }

      const params = {
        pageSize,
        pageNum,
        ...searchForm,
        status,
        additionalStatus,
        // orderStatus,
        // afterServiceType,
      };
      const { code, result } = yield call(selectPage, params);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            total: result.total,
            dataSource: result.records || [],
          },
        });
      }
      yield put({
        type: 'getAfterSaleAcount',
      });
    },
    *createCoupon({ payload }, { call, put, select }) {
      const { salesActivities } = yield select(({ salesActivities }) => ({
        salesActivities,
      }));
      const { disabledAreaTableList } = salesActivities;
      const { value, VoList } = payload;

      const { chargeMode, name, freightObj } = value;
      let distributionAreaAndFreightVoList = VoList;

      let nonDeliveryAreaVoList;
      let nonDeliveryArea = 0;
      if (disabledAreaTableList && disabledAreaTableList.length > 0) {
        nonDeliveryAreaVoList = [];
        nonDeliveryArea = 1;
        const item = disabledAreaTableList?.[0];
        // 选中的数据
        const { selectList } = item;
        selectList.forEach((i) => {
          if (i.slice(-4) === '0000') {
            // 省
            nonDeliveryAreaVoList.push({
              province: i,
            });
          } else {
            if (i.slice(-2) === '00') {
              // 市
              nonDeliveryAreaVoList.push({
                city: i,
              });
            } else {
              // 区
              nonDeliveryAreaVoList.push({
                district: i,
              });
            }
          }
        });

        //
      }

      const params = {
        chargeMode,
        name,
        ...freightObj,
        nonDeliveryArea,
        nonDeliveryAreaVoList,
        distributionAreaAndFreightVoList,
      };

      const { code } = yield call(createCoupon, params);
      if (code === 200) {
        message.success('提交成功');

        yield put({
          type: 'updateState',
          payload: {
            addOpen: false,
            drawerParams: {},
          },
        });
      }
    },
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
        obj.collectDate = [collectBeginDate, collectEndDate];
        if (result?.useTimeType === 1) {
          obj.useTimeRange = [useBeginDate, useEndTime];
        }
        if (result?.useTimeType === 2) {
          obj.useTimeRange = effectiveDuration;
        }
        obj.minandsale = {
          first: minimumConsumption,
          second: price,
        };
        yield put({
          type: 'update',
          payload: {
            queryInfo: { ...obj, ...others },
            visible: true,
          },
        });
      }
    },
  },
};
