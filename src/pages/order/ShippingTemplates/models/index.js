import { addTemplate, deleteItem, getDetails, updateTemplate } from '@/service/order/shipping';
import { message } from 'antd';

const shipping = {
  namespace: 'shippingtemplates',
  state: {
    page: 1,
    pageSize: 20,
    total: 0,
    tableData: [],
    platformList: [],
    addOpen: false,
    drawerType: 'add',
    drawerParams: {},
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
    *getDetails({ payload }, { call, put, select }) {
      const { commonInterface, shippingtemplates } = yield select(
        ({ commonInterface, shippingtemplates }) => ({
          commonInterface,
          shippingtemplates,
        }),
      );
      const { treeList } = commonInterface;
      const { drawerType } = shippingtemplates;

      const { code, result } = yield call(getDetails, payload);
      if (code === 200 && result) {
        let daArr = [];
        // 指定区域
        if (
          result?.distributionAreaAndFreightDtoList &&
          result?.distributionAreaAndFreightDtoList?.length > 0
        ) {
          daArr = [];
          result?.distributionAreaAndFreightDtoList.forEach((item) => {
            const daIndex = daArr.findIndex((i) => i?.id === item?.polymerization);
            if (daIndex > -1) {
              let obj = daArr?.[daIndex];
              let selectList = obj.selectList;
              let selectLabel = obj.selectLabel;
              let areaCode = '';
              let editObj = obj.editObj;
              if (item?.province) {
                const provinceObj = treeList.find((i) => i?.areaCode === item?.province);
                selectList.push(provinceObj?.areaCode);
                areaCode = provinceObj?.areaCode;
                selectLabel = selectLabel + ' , ' + provinceObj?.areaName;
              }
              if (item?.city) {
                const provinceObj = treeList.find(
                  (i) => i?.areaCode === `${item?.city.slice(0, 2)}0000`,
                );
                const cityObj = provinceObj?.children?.find((i) => i?.areaCode === item?.city);
                selectList.push(cityObj?.areaCode);
                areaCode = cityObj?.areaCode;
                selectLabel = selectLabel + ' , ' + cityObj?.areaName;
              }
              if (item?.district) {
                const provinceObj = treeList.find(
                  (i) => i?.areaCode === `${item?.district.slice(0, 2)}0000`,
                );
                const cityObj = provinceObj?.children?.find(
                  (i) => i?.areaCode === `${item?.district.slice(0, 4)}00`,
                );
                const districtObj = cityObj?.children?.find((i) => i?.areaCode === item?.district);
                selectList.push(districtObj?.areaCode);
                areaCode = districtObj?.areaCode;
                selectLabel = selectLabel + ' , ' + districtObj?.areaName;
              }
              editObj[areaCode] = item;
              obj.selectLabel = selectLabel;
            } else {
              let selectList = [];
              let selectLabel = '';
              let areaCode = '';
              if (item?.province) {
                const provinceObj = treeList.find((i) => i?.areaCode === item?.province);
                selectList.push(provinceObj?.areaCode);
                areaCode = provinceObj?.areaCode;
                selectLabel = provinceObj?.areaName;
              }
              if (item?.city) {
                const provinceObj = treeList.find(
                  (i) => i?.areaCode === `${item?.city.slice(0, 2)}0000`,
                );
                const cityObj = provinceObj?.children?.find((i) => i?.areaCode === item?.city);
                selectList.push(cityObj?.areaCode);
                areaCode = cityObj?.areaCode;
                selectLabel = cityObj?.areaName;
              }
              if (item?.district) {
                const provinceObj = treeList.find(
                  (i) => i?.areaCode === `${item?.district.slice(0, 2)}0000`,
                );
                const cityObj = provinceObj?.children?.find(
                  (i) => i?.areaCode === `${item?.district.slice(0, 4)}00`,
                );
                const districtObj = cityObj?.children?.find((i) => i?.areaCode === item?.district);
                selectList.push(districtObj?.areaCode);
                areaCode = districtObj?.areaCode;
                selectLabel = districtObj?.areaName;
              }
              daArr.push({
                id: item?.polymerization,
                firstPart: item?.firstPart,
                freightCharge: item?.freightCharge,
                continuedEmphasis: item?.continuedEmphasis,
                feesRenewal: item?.feesRenewal,
                selectList,
                selectLabel,
                editObj: { [areaCode]: item },
              });
            }
          });
        }

        // 指定限售
        let nonArr = [];
        if (result?.nonDeliveryAreaDtoList && result?.nonDeliveryAreaDtoList?.length > 0) {
          nonArr = [];
          result?.nonDeliveryAreaDtoList.forEach((item) => {
            if (nonArr.length > 0) {
              let obj = nonArr?.[0];
              let selectList = obj.selectList;
              let selectLabel = obj.selectLabel;
              let areaCode = '';
              let editObj = obj.editObj;
              if (item?.province) {
                const provinceObj = treeList.find((i) => i?.areaCode === item?.province);
                selectList.push(provinceObj?.areaCode);
                areaCode = provinceObj?.areaCode;
                selectLabel = selectLabel + ' , ' + provinceObj?.areaName;
              }
              if (item?.city) {
                const provinceObj = treeList.find(
                  (i) => i?.areaCode === `${item?.city.slice(0, 2)}0000`,
                );
                const cityObj = provinceObj?.children?.find((i) => i?.areaCode === item?.city);
                selectList.push(cityObj?.areaCode);
                areaCode = cityObj?.areaCode;
                selectLabel = selectLabel + ' , ' + cityObj?.areaName;
              }
              if (item?.district) {
                const provinceObj = treeList.find(
                  (i) => i?.areaCode === `${item?.district.slice(0, 2)}0000`,
                );
                const cityObj = provinceObj?.children?.find(
                  (i) => i?.areaCode === `${item?.district.slice(0, 4)}00`,
                );
                const districtObj = cityObj?.children?.find((i) => i?.areaCode === item?.district);
                selectList.push(districtObj?.areaCode);
                areaCode = districtObj?.areaCode;
                selectLabel = selectLabel + ' , ' + districtObj?.areaName;
              }
              editObj[areaCode] = item;
              obj.selectLabel = selectLabel;
            } else {
              let selectList = [];
              let selectLabel = '';
              let areaCode = '';
              if (item?.province) {
                const provinceObj = treeList.find((i) => i?.areaCode === item?.province);
                selectList.push(provinceObj?.areaCode);
                areaCode = provinceObj?.areaCode;
                selectLabel = provinceObj?.areaName;
              }
              if (item?.city) {
                const provinceObj = treeList.find(
                  (i) => i?.areaCode === `${item?.city.slice(0, 2)}0000`,
                );
                const cityObj = provinceObj?.children?.find((i) => i?.areaCode === item?.city);
                selectList.push(cityObj?.areaCode);
                areaCode = cityObj?.areaCode;
                selectLabel = cityObj?.areaName;
              }
              if (item?.district) {
                const provinceObj = treeList.find(
                  (i) => i?.areaCode === `${item?.district.slice(0, 2)}0000`,
                );
                const cityObj = provinceObj?.children?.find(
                  (i) => i?.areaCode === `${item?.district.slice(0, 4)}00`,
                );
                const districtObj = cityObj?.children?.find((i) => i?.areaCode === item?.district);
                selectList.push(districtObj?.areaCode);
                areaCode = districtObj?.areaCode;
                selectLabel = districtObj?.areaName;
              }
              nonArr.push({
                id: '666999',
                selectList,
                selectLabel,
                editObj: { [areaCode]: item },
              });
            }
          });
        }
        yield put({
          type: 'updateState',
          payload: {
            drawerParams:
              drawerType === 'edit' ? result : { ...result, name: `${result?.name} 副本` },
            assignedAreaTableList: daArr,
            disabledAreaTableList: nonArr,
            addOpen: true,
          },
        });
      }
    },

    *addTemplate({ payload }, { call, put, select }) {
      const { shippingtemplates } = yield select(({ shippingtemplates }) => ({
        shippingtemplates,
      }));
      const { disabledAreaTableList } = shippingtemplates;
      const { value, VoList } = payload;

      const { chargeMode, name, freightObj } = value;
      let distributionAreaAndFreightVoList = VoList;

      let nonDeliveryAreaVoList;
      let nonDeliveryArea = 0;
      if (disabledAreaTableList && disabledAreaTableList.length > 0) {
        nonDeliveryAreaVoList = [];
        nonDeliveryArea = 1;
        const item = disabledAreaTableList?.[0];
        // 选中的数据
        const { selectList } = item;
        selectList.forEach((i) => {
          if (i.slice(-4) === '0000') {
            // 省
            nonDeliveryAreaVoList.push({
              province: i,
            });
          } else {
            if (i.slice(-2) === '00') {
              // 市
              nonDeliveryAreaVoList.push({
                city: i,
              });
            } else {
              // 区
              nonDeliveryAreaVoList.push({
                district: i,
              });
            }
          }
        });

        //
      }

      const params = {
        chargeMode,
        name,
        ...freightObj,
        nonDeliveryArea,
        nonDeliveryAreaVoList,
        distributionAreaAndFreightVoList,
      };

      const { code } = yield call(addTemplate, params);
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

    *updateTemplate({ payload }, { call, put, select }) {
      const { shippingtemplates } = yield select(({ shippingtemplates }) => ({
        shippingtemplates,
      }));
      const { disabledAreaTableList, drawerParams } = shippingtemplates;

      const { value, VoList } = payload;

      const { chargeMode, name, freightObj } = value;
      let distributionAreaAndFreightVoList = VoList;

      let nonDeliveryAreaVoList;
      let nonDeliveryArea = 0;
      if (disabledAreaTableList && disabledAreaTableList.length > 0) {
        nonDeliveryAreaVoList = [];
        nonDeliveryArea = 1;
        const item = disabledAreaTableList?.[0];
        // 选中的数据
        const { selectList } = item;
        selectList.forEach((i) => {
          if (i.slice(-4) === '0000') {
            // 省
            if (item?.editObj?.[i]) {
              nonDeliveryAreaVoList.push({ province: i, ...item?.editObj?.[i] });
            } else {
              nonDeliveryAreaVoList.push({ province: i });
            }
          } else {
            if (i.slice(-2) === '00') {
              // 市
              if (item?.editObj?.[i]) {
                nonDeliveryAreaVoList.push({ city: i, ...item?.editObj?.[i] });
              } else {
                nonDeliveryAreaVoList.push({ city: i });
              }
            } else {
              // 区
              if (item?.editObj?.[i]) {
                nonDeliveryAreaVoList.push({ district: i, ...item?.editObj?.[i] });
              } else {
                nonDeliveryAreaVoList.push({ district: i });
              }
            }
          }
        });

        //
      }

      const params = {
        id: drawerParams?.id,
        chargeMode,
        name,
        ...freightObj,
        nonDeliveryArea,
        nonDeliveryAreaVoList,
        distributionAreaAndFreightVoList,
      };
      const { code } = yield call(updateTemplate, params);
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

    *deleteItem({ payload }, { call }) {
      const { code } = yield call(deleteItem, payload);
      if (code === 200) {
        message.success('删除成功');
        payload.actionRef.current?.reload();
      }
    },
  },
};

export default shipping;
