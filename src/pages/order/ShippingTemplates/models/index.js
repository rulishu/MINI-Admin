import { addTemplate, selectPageList, updateTemplate } from '@/service/order/shipping';

const shipping = {
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

    //
    isModalOpen: false, // 选区弹窗
    disabledList: [], // 禁用列表
    unchecked: [],
    assignedAreaTableList: [], // 指定地区运费列表
    disabledAreaTableList: [], // 限售地区运费列表
    editAreaId: '', // 编辑中的数据ID
    areaListType: 'can', // can 指定地区 ， not 限售地区
  },
  reducers: {
    updateState: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
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
    // *getCategoryTree(_, { call, put }) {
    //   const { code, result } = yield call(getCategoryTree);
    //   if (code === 200 && result) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         categoryTree: result || [],
    //       },
    //     });
    //   }
    // },

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

      const { code, result, message } = yield call(selectPageList, obj);
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

    *addTemplate({ payload }, { call, put }) {
      const { code } = yield call(addTemplate, payload.searchParams);
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

    *updateTemplate({ payload }, { call, put, select }) {
      const groupManage = yield select(({ groupManage }) => groupManage);
      const { drawerParams } = groupManage;

      const { code } = yield call(updateTemplate, {
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

    // *deleteCategory({ payload }, { call, put }) {
    //   const { code } = yield call(deleteCategory, payload);
    //   if (code === 200) {
    //     yield put({
    //       type: 'getCategoryTree',
    //     });
    //     yield put({
    //       type: 'getAllCategory',
    //     });
    //     payload.actionRef.current?.reload();
    //   }
    // },
  },
};

export default shipping;
