import {
  addGoods,
  addMarket,
  deleteGoods,
  deleteMarket,
  getMarketTree,
  moveMarket,
  selectMarket,
  updateGoodsSort,
  updateMarket,
} from '@/service/goods/marketManage';
import { message } from 'antd';

const group = {
  namespace: 'marketManage',
  state: {
    marketTree: [],
    activeMarketId: '',
    page: 1,
    pageSize: 10,
    cascaderList: [],
    tableData: [],
    total: 0,
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
            activeMarketId: '',
            marketTree: result || [],
            cascaderList: [],
            tableData: [],
          },
        });
      }
    },

    *addMarket({ payload }, { call, put }) {
      const { code } = yield call(addMarket, payload);
      if (code === 200) {
        yield put({
          type: 'getMarketTree',
        });
      }
    },

    *moveMarket({ payload }, { call, put }) {
      console.log('payload: ', payload);

      const boList = [];
      payload.gData.forEach((item, index) => {
        boList.push({
          id: item?.key,
          parentId: item?.parentId,
          sort: index + 1,
        });
        if (item?.children) {
          item?.children.forEach((i, ind) => {
            boList.push({
              id: i?.key,
              parentId: i?.parentId,
              sort: ind + 1,
            });
          });
        }
      });
      const { code } = yield call(moveMarket, { boList });
      if (code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            activeMarketId: '',
            cascaderList: [],
            tableData: [],
          },
        });
        // yield put({
        //   type: 'getMarketTree',
        // });
      }
    },

    *deleteMarket({ payload }, { call, put, select }) {
      const marketManage = yield select(({ marketManage }) => marketManage);
      const { marketTree } = marketManage;
      const obj = marketTree.find((item) => item?.id === payload?.id);
      let ids = [payload?.id];
      if (obj?.parentId === '0') {
        obj?.child.forEach((item) => {
          ids.push(item?.id);
        });
      }

      const { code } = yield call(deleteMarket, { ids });
      if (code === 200) {
        yield put({
          type: 'getMarketTree',
        });
      }
    },

    // 更新绑定商品类目
    *updateMarket({ payload }, { call, select }) {
      console.log('payload: ', payload);
      const marketManage = yield select(({ marketManage }) => marketManage);
      const { cascaderList, activeMarketId } = marketManage;

      let categoryArray = '';
      if (cascaderList.length > 0) {
        const arr = cascaderList.map((item) => item?.slice(-1)?.[0]);
        categoryArray = arr.join();
      }

      const { code } = yield call(updateMarket, {
        categoryArray,
        itemArray: JSON.stringify(cascaderList),
        id: activeMarketId,
      });
      if (code === 200) {
        payload?.proTableRef?.current?.reload();
        message.success('绑定成功');

        //
        // yield put({
        //   type: 'updateState',
        //   payload: {},
        // });
      } else {
        message.success('绑定失败');
      }
    },

    *selectMarket({ payload }, { call, put }) {
      const { params, callback } = payload;
      const { code, result } = yield call(selectMarket, params);
      if (code === 200 && result) {
        let obj = { cascaderList: [], tableData: [], total: 0 };
        //
        if (result?.categoryArray) {
          obj.cascaderList = JSON.parse(result?.itemArray);
        }
        //
        if (result?.relationDtoPage) {
          if (result?.relationDtoPage?.records && result?.relationDtoPage?.records.length > 0) {
            obj.tableData = result?.relationDtoPage?.records;
            obj.total = result?.relationDtoPage?.total;
          }
        }
        //
        yield put({
          type: 'updateState',
          payload: {
            ...obj,
          },
        });
        callback && callback(obj);
      }
    },

    *addGoods({ payload }, { call, select }) {
      const { id, callback } = payload;
      const marketManage = yield select(({ marketManage }) => marketManage);
      const { activeMarketId } = marketManage;

      const { code } = yield call(addGoods, { marketingId: activeMarketId, itemId: id, type: 1 });
      if (code === 200) {
        callback(true);
      }
    },

    *deleteGoods({ payload }, { call }) {
      const { id, callback } = payload;

      const { code } = yield call(deleteGoods, { id: id });
      if (code === 200) {
        callback(true);
      }
    },

    *updateGoodsSort({ payload }, { call }) {
      const { id, sort, callback } = payload;

      const { code } = yield call(updateGoodsSort, {
        id: id,
        sort: sort && Number(sort),
      });
      if (code === 200) {
        callback(true);
      }
    },
  },
};

export default group;
