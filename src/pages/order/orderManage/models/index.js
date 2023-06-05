import {
  getInfoPushList,
  getLogisticsCompany,
  getPushItems,
  getSuppliersList,
  getUserList,
  pushItems,
  selectById,
  update,
} from '@/service/order/orderManage';

export default {
  namespace: 'orderManage',
  state: {
    activeKey: 1,
    selectedRowKeys: [],
    selectedRows: [],
    /** view详情 push发货 copy复制订单号 */
    type: '',
    /** 详情弹窗  */
    visible: false,
    /** 详情数据  */
    queryData: {},
    /** 发货弹窗  */
    pushVisible: false,
    /** 发货数据  */
    pushData: {},
    logisticsCompanyList: [], // 物流公司
    suppliersList: [], // 代理商列表
    userList: [], // 客户列表
    pushList: [], // 包裹信息
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    // 获取供应商列表
    *getSuppliersList({ payload }, { call, put }) {
      const { code, result } = yield call(getSuppliersList, payload);
      if (code === 200) {
        let suppliersList = (result.records || []).map((item) => {
          return {
            label: item.supplierName,
            value: item.supplierId,
          };
        });
        yield put({
          type: 'update',
          payload: {
            suppliersList: suppliersList,
          },
        });
      }
    },
    // 获取用户列表
    *getUserList({ payload }, { call, put }) {
      const { code, result } = yield call(getUserList, payload);
      if (code === 200) {
        let userList = (result || []).map((item) => {
          return {
            label: item.userName,
            value: item.userId,
            mobile: item.mobile,
            headUrl: item.headUrl,
          };
        });
        yield put({
          type: 'update',
          payload: {
            userList: userList,
          },
        });
      }
    },
    // 获取物流公司列表
    *getLogisticsCompany(_, { call, put }) {
      const { code, result } = yield call(getLogisticsCompany);
      if (code === 200) {
        let logisticsCompanyList = result.map((item) => {
          return {
            label: item.name,
            value: item.name,
          };
        });
        yield put({
          type: 'update',
          payload: {
            logisticsCompanyList: logisticsCompanyList || [],
          },
        });
      }
    },
    // 获取发货商品列表
    *getPushItems({ payload }, { call, put }) {
      const { code, result } = yield call(getPushItems, payload);
      if (code === 200) {
        yield put({
          type: 'update',
          payload: {
            pushVisible: true,
            pushData: { ...payload, items: result, type: 1 },
          },
        });
      }
    },
    // 发货
    *pushItems({ payload, callback }, { call, put }) {
      const { code } = yield call(pushItems, payload);
      if (code === 200) {
        yield put({
          type: 'update',
          payload: {
            pushVisible: false,
            pushData: {},
            type: '',
          },
        });
        callback?.();
      }
    },
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
