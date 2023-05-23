// import PriceName from '@/components/sku';
// import TheBigCascader from '@/components/CategoryType';
import SKUButton from '@/components/SKUButton';
import TheUpload from '@/components/upload';
import { addItem, updateItem } from '@/service/goods/productManage';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Cascader } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import item from './item';

const TheForm = () => {
  const form = useForm();
  const { productManage, groupManage, supplier } = useSelector((state) => state);
  const { type, queryInfo, showForm, templateIdList } = productManage;
  const { categoryTree } = groupManage;
  const { suppliersList } = supplier;
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
          },
        });
      }
    },
  });

  useEffect(() => {
    form.setValues({
      form1: {
        ...queryInfo,
        mainGraph: queryInfo?.mainGraph ? [{ url: queryInfo?.mainGraph, name: 'goods' }] : [],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showForm, queryInfo]);

  const onFinish = (values) => {
    console.log('values: ', values);
    const { form1, form2, form3, form4, form5 } = values;

    mutateAsync({
      ...form1,
      ...form2,
      ...form3,
      ...form4,
      ...form5,
      id: queryInfo?.id, // 商品ID
      categoryId: form1?.categoryId?.slice(-1)?.[0], // 类目ID
      mainGraph: form1.mainGraph?.[0]?.url, // 图片url
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

  return (
    <div style={{ width: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
      {/* <TheBigCascader categoryTree={categoryTree} /> */}
      <FormRender
        form={form}
        readOnly={type === 'view'}
        schema={item(options, suppliersList, templateIdList)}
        widgets={{ cascader: Cascader, picupload: TheUpload, skubutton: SKUButton }}
        labelWidth={120}
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
                    },
                  });
                },
              },
            ]}
          />
        )}
        onFinish={onFinish}
      />
    </div>
  );
};
export default TheForm;
