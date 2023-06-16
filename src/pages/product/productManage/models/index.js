import {
  addItem,
  checkSKUCode,
  createSKU,
  getAllTemplateId,
  insertAttribute,
  selectAttr,
  selectSKU,
  updateItem,
  updateSKU,
} from '@/service/goods/productManage';
import dayjs from 'dayjs';

export default {
  namespace: 'productManage',
  state: {
    /** table activeKey  */
    activeKey: '1',
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
    // 查sku
    *selectSKU({ payload }, { call, put, select }) {
      const { productManage } = yield select(({ productManage }) => ({ productManage }));
      const { attrOptions } = productManage;
      const { code, result } = yield call(selectSKU, { id: payload?.id });
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
                  value: item?.value === 0 ? '0' : item?.value,
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
                  value: item?.value === 0 ? '0' : item?.value,
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
                  obj[name.attributeName] = theAttr.value === 0 ? '0' : theAttr.value;
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
        payload?.callback();
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
    // 查规格名
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
    // 新增规格名
    *insertAttribute({ payload }, { call }) {
      const { callback, ...others } = payload;
      const { code, result } = yield call(insertAttribute, others);
      if (code === 200) {
        callback(result);
      }
    },

    *editGoods({ payload }, { call, select }) {
      const { values, callback } = payload;
      const { productManage } = yield select(({ productManage }) => ({ productManage }));
      const { type, queryInfo, itemSkuVos } = productManage;

      const params = {
        ...values,
        categoryId:
          values?.categoryId?.slice(-1)?.[0] && Number(values?.categoryId?.slice(-1)?.[0]), // 类目ID
        suppliersId: values?.suppliersId?.value,
        suppliersName: values?.suppliersId?.label?.split('(')?.[0],
        provenance: values?.provenance?.join(),
        //
        mainGraph: values?.mainGraphs?.[0]?.url,
        mainGraphs: values?.mainGraphs?.map((item) => ({
          itemName: values?.itemName,
          itemId: queryInfo?.id,
          path: item?.url,
          version: 0,
        })),
        itemVideo: values?.itemVideo?.[0]?.url,
        itemImageVoList: values?.itemImageVoList.map((item) => ({
          itemName: values?.itemName,
          path: item?.url,
          version: 1,
          itemId: queryInfo?.id,
        })),
        //
        itemSkuVos,
        //
        templateId: values?.templateId?.value,
        templateName: values?.templateId?.label,
        onShelf: values?.groundType === 3 ? 0 : 2,
        openTime:
          values?.groundType === 3 ? null : dayjs(values?.openTime).format('YYYY-MM-DD HH:mm:00'),

        id: queryInfo?.id, // 商品ID
      };

      const data = yield call(type === 'add' ? addItem : updateItem, params);
      if (data?.code && data?.code === 200) {
        callback();
      }
    },
    *checkSKUCode({ payload }, { call }) {
      const { list, callback } = payload;
      const arr = list.map((item) => item?.skuCode);

      const data = yield call(checkSKUCode, arr);
      if (data?.code && data?.code === 200) {
        //
        callback();
      }
    },
  },
};
