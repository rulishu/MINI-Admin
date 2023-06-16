import {
  getAfterSaleAcount,
  refundApply,
  selectPage,
  updateOrderGoodsStatus,
} from '@/service/order/aftersales';
import { message } from 'antd';

export default {
  namespace: 'aftersales',
  state: {
    // 每页条数
    pageSize: 10,
    // 第几页
    pageNum: 1,
    // 总条数
    total: 0,
    searchForm: {},
    // 数据源
    dataSource: [],
    activeKey: '1',
    /** view详情 push发货 */
    type: '',
    /** 详情弹窗  */
    visible: false,
    /** 发货弹窗  */
    pushVisible: false,
    /** 详情数据  */
    queryData: {},
    /** 发货信息  */
    pushData: {},
    companySelect: [], // 物流公司
    suppliersList: [],
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *getAfterSaleAcount(_, { call, put }) {
      const res = yield call(getAfterSaleAcount);
      if (res?.code === 200) {
        yield put({
          type: 'update',
          payload: {
            allAcount: res?.result,
          },
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    *selectByPage(_, { call, put, select }) {
      const { searchForm, pageSize, pageNum, activeKey } = yield select(
        (state) => state.aftersales,
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
    *updateOrderGoodsStatus({ payload }, { call, put }) {
      const { code } = yield call(updateOrderGoodsStatus, payload);
      if (code === 200) {
        yield put({
          type: 'selectByPage',
        });
        message.success('审核成功');
      }
    },
    // 退款
    *refundApply({ payload }, { call, put }) {
      const { record } = payload;
      console.log('退款: ', record);
      const data = yield call(refundApply, {
        afterServiceId: record?.orderObj?.id, //售后单ID
        amount: record?.totalPrice, //退款金额 单位元
        // amount: 0.01,
        // outOrderNo: '495ff36bd06b4093b2f648609e97740c', //外部单号
        orderNo: record?.orderObj?.orderNumber,
        reason: record?.orderObj?.reason, //退款原因
        userId: record?.orderObj?.createBy, //订单用户ID
      });
      if (data?.code === 200) {
        yield put({
          type: 'selectByPage',
        });
        message.success('退款成功');
      }
    },
    // *goToPage({ payload: { pageNum, pageSize } }, { put }) {
    //   yield put({ type: 'update', payload: { ...{ pageNum, pageSize } } });
    //   yield put({ type: 'selectByPage' });
    // },
  },
};
