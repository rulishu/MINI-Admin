import {
  addGoods,
  addMarket,
  deleteMarket,
  getMarketTree,
  moveMarket,
  selectMarket,
  updateMarket,
} from '@/service/goods/marketManage';

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
          type: 'getMarketTree',
        });
      }
    },

    *deleteMarket({ payload }, { call, put }) {
      const { code } = yield call(deleteMarket, payload);
      if (code === 200) {
        yield put({
          type: 'getMarketTree',
        });
      }
    },

    // 更新绑定商品类目
    *updateMarket({ payload }, { call, put, select }) {
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
        //
        yield put({
          type: 'updateState',
          payload: {},
        });
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
    *addGoods({ payload }, { call, put }) {
      const { code } = yield call(addGoods, payload);
      if (code === 200) {
        yield put({
          type: 'getMarketTree',
        });
      }
    },
  },
};

export default group;
