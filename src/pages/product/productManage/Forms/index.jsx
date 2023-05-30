// import PriceName from '@/components/sku';
// import TheBigCascader from '@/components/CategoryType';
import SKUButton from '@/components/SKUButton';
import TheUpload from '@/components/Upload';
import { addItem, updateItem } from '@/service/goods/productManage';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Card, Cascader, DatePicker } from 'antd';
import dayjs from 'dayjs';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import item from './item';

const TheForm = () => {
  const form = useForm();
  const { productManage, groupManage, supplier, commonInterface } = useSelector((state) => state);
  const { type, queryInfo, showForm, templateIdList, itemSkuVos } = productManage;
  const { categoryTree } = groupManage;
  const { suppliersList } = supplier;
  const { treeList } = commonInterface;
  // const [step, setStep] = useState(1);

  const dispatch = useDispatch();

  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: type === 'add' ? addItem : updateItem,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        dispatch({
          type: 'productManage/update',
          payload: {
            showForm: false,
            reload: true,
            type: '',
            queryInfo: {},
            itemSkuVos: [],
            attributeVos: [],
            showSKU: false,
          },
        });
      }
    },
  });

  useEffect(() => {
    form.setValues({
      ...queryInfo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showForm, queryInfo]);

  const onFinish = (values) => {
    console.log('保存: ', { ...values, itemSkuVos });
    const { form1, form2, form3, form4, form5 } = values;
    mutateAsync({
      categoryId: form1?.categoryId?.slice(-1)?.[0] && Number(form1?.categoryId?.slice(-1)?.[0]), // 类目ID
      ...form2,
      suppliersId: form2?.suppliersId?.value,
      suppliersName: form2?.suppliersId?.label.split('(')?.[0],
      provenance: form2?.provenance.join(),
      itemImageVoList: form3?.itemImageVoList.map((item) => ({
        itemName: form2?.itemName,
        path: item?.url,
        version: 1,
        itemId: queryInfo?.id,
      })),
      itemVideo: form3?.itemVideo?.[0]?.url,
      mainGraph: form3?.mainGraphs?.[0]?.url,
      mainGraphs: form3?.mainGraphs.map((item) => ({
        itemName: form2?.itemName,
        itemId: queryInfo?.id,
        path: item?.url,
        version: 0,
      })),
      ...form4,
      price: form4?.price && Number(form4?.price),
      ...form5,
      openTime:
        form5?.groundType === 3 ? null : dayjs(form5?.openTime).format('YYYY-MM-DD HH:mm:00'),
      templateId: form5?.templateId?.value,
      templateName: form5?.templateId?.label,
      itemSkuVos,
      id: queryInfo?.id, // 商品ID
      onShelf: form5?.groundType === 3 ? 0 : 2,
      //   mainGraph: form1.mainGraph?.[0]?.url, // 图片url
    });
  };

  const handler = (data) => {
    const arr = [];

    data.forEach((item) => {
      if (item?.id !== '0') {
        const obj = { label: item?.label || '', value: item?.id };
        if (item?.children && item?.children.length > 0) {
          obj.children = handler(item.children);
        }
        arr.push(obj);
      }
    });

    return arr;
  };

  const options = () => {
    if (categoryTree && categoryTree.length > 0) {
      return [...handler(categoryTree)];
    } else {
      return [];
    }
  };

  const handlerCity = (data) => {
    const arr = [];
    data.forEach((item) => {
      const obj = { label: item?.areaName, value: item?.areaId };
      if (item?.children && item?.children.length > 0) {
        obj.children = handlerCity(item.children);
      }
      arr.push(obj);
    });

    return arr;
  };
  const cityTreeList = () => {
    if (treeList && treeList.length > 0) {
      return [...handlerCity(treeList)];
    } else {
      return [];
    }
  };

  const getMinSale = () => {
    itemSkuVos.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      // a 一定等于 b
      return 0;
    });
    return itemSkuVos?.[0]?.price || 0;
  };

  return (
    <Card bodyStyle={{ width: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
      {/* <TheBigCascader categoryTree={categoryTree} /> */}
      <FormRender
        form={form}
        colon={false}
        schema={item(
          options,
          suppliersList,
          templateIdList,
          cityTreeList,
          allStocks(itemSkuVos),
          getMinSale(),
        )}
        widgets={{
          cascader: Cascader,
          picupload: TheUpload,
          skubutton: SKUButton,
          antddate: DatePicker,
        }}
        labelWidth={120}
        // watch={{
        //   specifications: (value) => {
        //     form.setValues({ stock: allStocks(itemSkuVos) });
        //   },
        // }}
        footer={() => (
          <ButtonGroupPro
            button={[
              // {
              //   label: '下一步',
              //   type: 'primary',
              // key:"next",
              //   onClick: () => {
              //     setStep(2);
              //   },
              //   show: step === 1,
              // },
              {
                label: '保存',
                type: 'primary',
                key: 'save',
                onClick: form.submit,
                loading: isLoading,
                show: (type !== 'view').toString(),
                // && step === 2,
              },
              {
                label: '取消',
                key: 'cancel',
                onClick: () => {
                  dispatch({
                    type: 'productManage/update',
                    payload: {
                      showForm: false,
                      type: '',
                      queryInfo: {},
                      itemSkuVos: [],
                      attributeVos: [],
                      showSKU: false,
                    },
                  });
                },
              },
            ]}
          />
        )}
        onFinish={onFinish}
      />
    </Card>
  );
};
export default TheForm;

const allStocks = (itemSkuVos) => {
  let stock = 0;
  itemSkuVos.forEach((item) => {
    if (item?.stock) {
      stock = stock + Number(item?.stock);
    }
  });
  return stock;
};
