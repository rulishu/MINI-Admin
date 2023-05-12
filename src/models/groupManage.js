import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from '@/service/groupManage';
import { message } from 'antd';

const group = {
  namespace: 'groupManage',
  state: {
    page: 1,
    pageSize: 20,
    searchParams: {},
    total: 0,
    tableData: [],
    platformList: [],
    addOpen: false,
    drawerType: 'edit',
    drawerParams: {},
  },
  reducers: {
    updateState: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *getAllCategory(_, { call, put }) {
      const { code, data, msg } = yield call(getAllCategory);
      if (code === 200 && data) {
        yield put({
          type: 'updateState',
          payload: {
            // drawerParams: {},
          },
        });
      } else {
        message.error(msg);
      }
    },

    *selectPage({ payload }, { call, put, select }) {
      const { groupManage } = yield select(({ groupManage }) => ({
        groupManage,
      }));

      const page = payload?.page ? payload?.page : groupManage.page;
      const pageSize = payload?.pageSize ? payload?.pageSize : groupManage.pageSize;

      const { code, data, msg } = yield call(getCategory, {
        ...groupManage.searchParams,
        page,
        pageSize,
      });
      let tableData = [];
      if (code === 200 && data) {
        //
        tableData = data;
      } else {
        message.error(msg);
      }

      yield put({
        type: 'updateState',
        payload: {
          tableData,
        },
      });
    },

    *addCategory({ payload }, { call, put }) {
      const { code, data, msg } = yield call(addCategory, payload.searchParams);
      if (code === 200 && data) {
        //
        message.success('新增分类成功');

        yield put({
          type: 'updateState',
          payload: {
            addOpen: false,
            drawerParams: {},
          },
        });
        yield put({
          type: 'selectPage',
        });
      } else {
        message.error(msg);
      }
    },

    *updateCategory({ payload }, { call, put, select }) {
      const groupManage = yield select(({ groupManage }) => groupManage);
      const { drawerParams } = groupManage;

      const { code, data, msg } = yield call(updateCategory, {
        ...payload.searchParams,
        id: drawerParams?.id,
      });
      if (code === 200 && data) {
        //
        message.success('信息更新成功');
        yield put({
          type: 'updateState',
          payload: {
            addOpen: false,
            drawerParams: {},
          },
        });
        yield put({
          type: 'selectPage',
        });
      } else {
        message.error(msg);
      }
    },

    *deleteCategory({ payload }, { call, put }) {
      const { code, data, msg } = yield call(deleteCategory, payload);
      if (code === 200 && data) {
        //
        message.success('删除成功');
        yield put({
          type: 'selectPage',
        });
      } else {
        message.error(msg);
      }
    },
  },
};

export default group;
