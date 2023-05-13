// import PriceName from '@/components/sku';
import { addItem, updateItem } from '@/service/productManage';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Cascader } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import item from './item';

const Index = () => {
  const form = useForm();
  const { productManage, groupManage } = useSelector((state) => state);
  const { type, queryInfo, showForm } = productManage;
  const { categoryList } = groupManage;

  const dispatch = useDispatch();

  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: type === 'add' ? addItem : updateItem,
    onSuccess: ({ code }) => {
      if (code === 200) {
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
      form1: { ...queryInfo },
    });
  }, [showForm, queryInfo]);

  const onFinish = (values) => {
    const { form1 } = values;
    mutateAsync({ ...form1, id: queryInfo?.id, parentId: form1?.parentId?.slice(-1)?.[0] });
  };

  const handler = (data) => {
    return data.map((item) => {
      let arr = [];
      const obj = { label: item?.categoryName || '', value: item?.id };
      if (item?.children && item?.children.length > 0) {
        arr = arr.push(handler(item.children));
        obj.children = arr;
      }
      return obj;
    });
  };

  const options = () => {
    if (categoryList.length > 0) {
      return [...handler(categoryList)];
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
        widgets={{ cascader: Cascader }}
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
      {/* <PriceName /> */}
    </div>
  );
};
export default Index;
