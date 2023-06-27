import { addTemplate, deleteItem, getDetails, updateTemplate } from '@/service/order/shipping';
import { message } from 'antd';

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
    *getDetails({ payload }, { call, put }) {
      const { code, result } = yield call(getDetails, payload);
      if (code === 200 && result) {
        yield put({
          type: 'updateState',
          payload: {
            addOpen: true,
          },
        });
      }
    },

    *addTemplate({ payload }, { call, put, select }) {
      const { shippingtemplates, commonInterface } = yield select(
        ({ shippingtemplates, commonInterface }) => ({
          shippingtemplates,
          commonInterface,
        }),
      );
      const { disabledAreaTableList, drawerType } = shippingtemplates;
      const { treeList } = commonInterface;
      console.log('treeList: ', treeList);
      const { value, VoList } = payload;

      const { chargeMode, name, freightObj } = value;
      let distributionAreaAndFreightVoList = VoList;

      let nonDeliveryAreaVoList;
      let nonDeriveryArea = 0;
      if (disabledAreaTableList && disabledAreaTableList.length > 0) {
        nonDeliveryAreaVoList = [];
        const item = disabledAreaTableList?.[0];
        // 选中的数据
        const { selectList } = item;
        selectList.forEach((i) => {
          if (i.slice(-4) === '0000') {
            // 省
            nonDeliveryAreaVoList.push({
              province: i,
            });
            // treeList[i]?.children?.forEach((city) => {
            //   if (city?.children) {
            //     city?.children.forEach((area) => {
            //       district.push(area?.areaCode);
            //     });
            //   }
            // });
          } else {
            if (i.slice(-2) === '00') {
              // 市
              nonDeliveryAreaVoList.push({
                city: i,
              });
              // treeList[`${i.slice(0, 2)}0000`]?.children?.[i]?.children?.forEach((area) => {
              //   district.push(area?.areaCode);
              // });
            } else {
              // 区
              nonDeliveryAreaVoList.push({
                district: i,
              });
            }
          }
        });

        //
      } else {
        nonDeriveryArea = 1;
      }

      let params = {
        chargeMode,
        name,
        ...freightObj,
        nonDeriveryArea,
        nonDeliveryAreaVoList,
        distributionAreaAndFreightVoList,
      };

      let api = addTemplate;
      if (drawerType === 'edit') {
        api = updateTemplate;
      }

      console.log('params: ', params);

      const { code } = yield call(api, params);
      if (code === 200) {
        message.success('提交成功');

        yield put({
          type: 'updateState',
          payload: {
            addOpen: false,
            drawerParams: {},
          },
        });
      }
    },

    *deleteItem({ payload }, { call, put }) {
      const { code } = yield call(deleteItem, payload);
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

export default shipping;
