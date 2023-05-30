import { addMarket, deleteMarket, getMarketTree } from '@/service/goods/marketManage';

const group = {
  namespace: 'marketManage',
  state: {
    marketTree: [],
  },
  reducers: {
    updateState: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *getMarketTree(_, { call, put }) {
      const { code, result } = yield call(getMarketTree);
      if (code === 200 && result) {
        yield put({
          type: 'updateState',
          payload: {
            marketTree: result || [],
          },
        });
      }
    },

    // *getAllCategory(_, { call, put }) {
    //   const { code, result } = yield call(getAllCategory);
    //   if (code === 200 && result) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         categoryList: result || [],
    //       },
    //     });
    //   }
    // },
    // *selectPage({ payload }, { call, put, select }) {
    //   const { groupManage } = yield select(({ groupManage }) => ({
    //     groupManage,
    //   }));
    //   const obj = {
    //     page: payload?.page ? payload?.page : groupManage.page,
    //     pageSize: payload?.pageSize ? payload?.pageSize : groupManage.pageSize,
    //   };

    //   if (groupManage?.searchParams?.categoryName?.label) {
    //     obj.categoryName = groupManage?.searchParams?.categoryName?.label;
    //   }

    //   const { code, result, message } = yield call(getCategory, obj);
    //   let tableData = [];
    //   if (code === 200 && result) {
    //     //
    //     tableData = result?.records || [];
    //   }
    //   yield put({
    //     type: 'updateState',
    //     payload: {
    //       tableData,
    //       message,
    //       total: result?.total || 0,
    //     },
    //   });
    // },

    *addMarket({ payload }, { call, put }) {
      const { code } = yield call(addMarket, payload);
      if (code === 200) {
        yield put({
          type: 'getMarketTree',
        });
      }
    },

    // *updateCategory({ payload }, { call, put, select }) {
    //   const groupManage = yield select(({ groupManage }) => groupManage);
    //   const { drawerParams } = groupManage;

    //   const { code } = yield call(updateCategory, {
    //     ...payload.searchParams,
    //     id: drawerParams?.id,
    //   });
    //   if (code === 200) {
    //     //
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         addOpen: false,
    //         drawerParams: {},
    //       },
    //     });
    //     yield put({
    //       type: 'getCategoryTree',
    //     });
    //     yield put({
    //       type: 'getAllCategory',
    //     });
    //     payload.actionRef.current?.reload();
    //   }
    // },

    *deleteMarket({ payload }, { call, put }) {
      const { code, result } = yield call(deleteMarket, payload);
      if (code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            marketTree: result || [],
          },
        });
      }
    },
  },
};

export default group;
