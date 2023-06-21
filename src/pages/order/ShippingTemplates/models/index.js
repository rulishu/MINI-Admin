import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  getCategoryTree,
  updateCategory,
} from '@/service/goods/groupManage';

const group = {
  namespace: 'shippingtemplates',
  state: {
    categoryList: [],
    categoryTree: [],
    page: 1,
    pageSize: 20,
    searchParams: {},
    total: 0,
    tableData: [],
    platformList: [],
    addOpen: false,
    drawerType: 'add',
    drawerParams: {},
    message: '',
  },
  reducers: {
    updateState: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *getAllCategory(_, { call, put }) {
      const { code, result } = yield call(getAllCategory);
      if (code === 200 && result) {
        yield put({
          type: 'updateState',
          payload: {
            categoryList: result || [],
          },
        });
      }
    },
    *getCategoryTree(_, { call, put }) {
      const { code, result } = yield call(getCategoryTree);
      if (code === 200 && result) {
        yield put({
          type: 'updateState',
          payload: {
            categoryTree: result || [],
          },
        });
      }
    },

    *selectPage({ payload }, { call, put, select }) {
      const { groupManage } = yield select(({ groupManage }) => ({
        groupManage,
      }));
      const obj = {
        page: payload?.page ? payload?.page : groupManage.page,
        pageSize: payload?.pageSize ? payload?.pageSize : groupManage.pageSize,
      };

      if (groupManage?.searchParams?.categoryName?.label) {
        obj.categoryName = groupManage?.searchParams?.categoryName?.label;
      }

      const { code, result, message } = yield call(getCategory, obj);
      let tableData = [];
      if (code === 200 && result) {
        //
        tableData = result?.records || [];
      }
      yield put({
        type: 'updateState',
        payload: {
          tableData,
          message,
          total: result?.total || 0,
        },
      });
    },

    *addCategory({ payload }, { call, put }) {
      const { code } = yield call(addCategory, payload.searchParams);
      if (code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            addOpen: false,
            drawerParams: {},
          },
        });
        yield put({
          type: 'getCategoryTree',
        });
        yield put({
          type: 'getAllCategory',
        });
        payload.actionRef.current?.reload();
      }
    },

    *updateCategory({ payload }, { call, put, select }) {
      const groupManage = yield select(({ groupManage }) => groupManage);
      const { drawerParams } = groupManage;

      const { code } = yield call(updateCategory, {
        ...payload.searchParams,
        id: drawerParams?.id,
      });
      if (code === 200) {
        //
        yield put({
          type: 'updateState',
          payload: {
            addOpen: false,
            drawerParams: {},
          },
        });
        yield put({
          type: 'getCategoryTree',
        });
        yield put({
          type: 'getAllCategory',
        });
        payload.actionRef.current?.reload();
      }
    },

    *deleteCategory({ payload }, { call, put }) {
      const { code } = yield call(deleteCategory, payload);
      if (code === 200) {
        yield put({
          type: 'getCategoryTree',
        });
        yield put({
          type: 'getAllCategory',
        });
        payload.actionRef.current?.reload();
      }
    },
  },
};

export default group;
