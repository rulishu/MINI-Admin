import { all } from '@/service/orderManage';
// import { useDispatch, useSelector } from '@umijs/max';
// import { message } from "antd";

export default {
  namespace: 'orderManage',
  state: {
    type: '',
    /** 详情弹窗  */
    visible: false,
    /** 上传弹窗  */
    upVisible: false,
    /** 详情数据  */
    queryData: {},
    /** 是否刷新分页  */
    reload: false,
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
  },
};
