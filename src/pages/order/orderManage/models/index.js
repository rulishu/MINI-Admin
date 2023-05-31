import { all, selectPage } from '@/service/order/orderManage';

export default {
  namespace: 'orderManage',
  state: {
    searchForm: {},
    // 每页条数
    pageSize: 10,
    // 第几页
    pageNum: 1,
    // 总条数
    total: 0,
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
        [activeKey === '售后中' || activeKey === '已关闭' ? 'afterSaleStatus' : 'status']:
          activeKey === '售后中' ? 1 : activeKey === '已关闭' ? 2 : activeKey,
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
    // eslint-disable-next-line no-unused-vars
    *all(_, { call, put, select }) {
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
    *goToPage({ payload: { pageNum, pageSize } }, { put }) {
      yield put({ type: 'update', payload: { ...{ pageNum, pageSize } } });
      yield put({ type: 'selectByPage' });
    },
  },
};
