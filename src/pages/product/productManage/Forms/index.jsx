// import PriceName from '@/components/sku';
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
  const { productManage, groupManage } = useSelector((state) => state);
  const { type, queryInfo, showForm } = productManage;
  const { categoryTree } = groupManage;

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
  }, [showForm, queryInfo]);

  const onFinish = (values) => {
    const { form1 } = values;
    mutateAsync({
      ...form1,
      id: queryInfo?.id, // 商品ID
      categoryId: form1?.categoryId?.slice(-1)?.[0], // 类目ID
      mainGraph: form1.mainGraph?.[0]?.url, // 图片url
    });
  };

  const handler = (data) => {
    return data.map((item) => {
      const obj = { label: item?.label || '', value: item?.id };
      if (item?.children && item?.children.length > 0) {
        obj.children = handler(item.children);
      }
      return obj;
    });
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
      <FormRender
        form={form}
        readOnly={type === 'view'}
        schema={item(options)}
        widgets={{ cascader: Cascader, picupload: TheUpload }}
        labelWidth={120}
        footer={() => (
          <ButtonGroupPro
            button={[
              {
                label: '保存',
                type: 'primary',
                onClick: form.submit,
                loading: isLoading,
                show: type !== 'view',
              },
              {
                label: '取消',
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
