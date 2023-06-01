import { all, getSuppliersList, getUserList, selectPage } from '@/service/order/orderManage';

export default {
  namespace: 'orderManage',
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
    activeKey: 1,
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
    suppliersList: [], // 代理商列表
    userList: [], // 客户列表
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    // eslint-disable-next-line no-unused-vars
    *selectByPage({ payload }, { call, put, select }) {
      const { searchForm, pageSize, pageNum, activeKey } = yield select(
        (state) => state.orderManage,
      );
      const params = {
        pageSize,
        pageNum,
        ...searchForm,
        startTime: searchForm.startTime && searchForm.startTime[0],
        endTime: searchForm.startTime && searchForm.startTime[1],
        [activeKey === '售后中' ? 'afterSaleStatus' : 'orderStatus']:
          activeKey === '售后中' ? 1 : activeKey,
      };
      let { code, result } = yield call(selectPage, params);
      if (code && code === 200) {
        yield put({
          type: 'update',
          payload: {
            total: result.total,
            dataSource: result.records || [],
          },
        });
      }
    },
    *all(_, { call, put }) {
      const { code, result } = yield call(all);
      if (code === 200) {
        let companyList = result.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
        yield put({
          type: 'update',
          payload: {
            companySelect: companyList || [],
          },
        });
      }
    },
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
    *goToPage({ payload: { pageNum, pageSize } }, { put }) {
      yield put({ type: 'update', payload: { ...{ pageNum, pageSize } } });
      yield put({ type: 'selectByPage' });
    },
  },
};
