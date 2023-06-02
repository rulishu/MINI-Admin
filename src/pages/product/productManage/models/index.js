import {
  createSKU,
  getAllTemplateId,
  selectAttr,
  selectSKU,
  updateSKU,
} from '@/service/goods/productManage';
export default {
  namespace: 'productManage',
  state: {
    /** table activeKey  */
    activeKey: '4',
    /** 是否打开form表单  */
    showForm: false,
    /** add新增 / edit编辑 / view查看  */
    type: '',
    /** 详情数据  */
    queryInfo: {},
    /** 分页选择框  */
    select: {
      selectedRowKeys: [],
      selectedRows: [],
    },
    /** 是否刷新分页  */
    reload: false,

    showSKU: false,
    srks: [],
    attrOptions: [],

    modalData: { groundType: 1 },
    isModalOpen: false,

    templateIdList: [],
    attributeVos: [],
    itemSkuVos: [],
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *selectSKU({ payload }, { call, put, select }) {
      const { productManage } = yield select(({ productManage }) => ({ productManage }));
      const { attrOptions } = productManage;
      const { code, result } = yield call(selectSKU, { id: payload });
      if (code === 200) {
        let attrLists = [];
        result.forEach((item) => {
          if (item?.attributes && item?.status === 1) {
            let arr = item?.attributes.concat([]);
            arr[0]['imageUrl'] = item?.imageUrl;
            attrLists = attrLists.concat(arr);
          }
        });
        //
        let arr = [];
        attrLists.forEach((item, index) => {
          const idx = arr.findIndex((i) => i?.attribute_value === item?.attributeId);
          if (idx > -1) {
            if (
              arr[idx].valueList.findIndex((attrdata) => attrdata?.value === item?.value) === -1
            ) {
              arr[idx].valueList = arr[idx].valueList.concat([
                {
                  id: index,
                  value: item?.value,
                  imageUrl: item?.imageUrl,
                },
              ]);
            }
          } else {
            arr.push({
              attribute_value: item?.attributeId,
              attribute_name: attrOptions.find((obj) => obj?.id === String(item?.attributeId))
                ?.attributeName,
              valueList: [
                {
                  id: index,
                  value: item?.value,
                  imageUrl: item?.imageUrl,
                },
              ],
            });
          }
        });

        const attributeVos = arr;
        console.log('初始化编辑attributeVos: ', attributeVos);

        const itemSkuVos = [];
        result.forEach((theSKU) => {
          if (theSKU?.status === 1) {
            if (theSKU?.attributes) {
              let obj = {};
              // let attributesObj = {};
              const attributes = [];
              theSKU?.attributes.forEach((theAttr) => {
                console.log('theAttr: ', theAttr);
                const name = attrOptions.find((item) => item?.id === String(theAttr?.attributeId));
                // ?.attributeName;
                console.log('name: ', name);

                if (name?.attributeName) {
                  obj[name.attributeName] = theAttr.value;
                  //     attributesObj[name] = { ...theAttr, attribute_name: name };
                  attributes.push({ ...theAttr, attribute_name: name?.attributeName });
                } else {
                  attributes.push(theAttr);
                }
              });
              // return { ...theSKU, ...obj, attributes: attributesObj };
              itemSkuVos.push({ ...theSKU, ...obj, attributes });
            } else {
              itemSkuVos.push(theSKU);
            }
          }
        });
        console.log('初始化编辑itemSkuVos: ', itemSkuVos);

        yield put({
          type: 'update',
          payload: {
            attributeVos,
            itemSkuVos,
            // skuList: result,
          },
        });
      }
    },

    *createSKU({ payload }, { call, put }) {
      const { code } = yield call(createSKU, payload);
      if (code === 200) {
        //
        yield put({
          type: 'update',
          payload: {
            showSKU: false,
            queryInfo: {},
            itemSkuVos: [],
          },
        });
      }
    },
    *updateSKU({ payload }, { call, put }) {
      const { code } = yield call(updateSKU, payload);
      if (code === 200) {
        //
        yield put({
          type: 'update',
          payload: {
            showSKU: false,
            queryInfo: {},
            itemSkuVos: [],
          },
        });
      }
    },
    *selectAttr(_, { call, put }) {
      const { code, result } = yield call(selectAttr, {});
      if (code === 200) {
        yield put({
          type: 'update',
          payload: {
            attrOptions: result,
          },
        });
      }
    },

    *getAllTemplateId(_, { call, put }) {
      const { code, result } = yield call(getAllTemplateId);
      if (code === 200) {
        yield put({
          type: 'update',
          payload: {
            templateIdList: result || [],
          },
        });
      }
    },
  },
};
