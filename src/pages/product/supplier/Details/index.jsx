import { create, updateInfo } from '@/service/goods/supplier';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Cascader, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import SelectUser from '../components/selectUser';
import { schema } from './schema';

const convert = (data) => {
  return data.map((item) => {
    const { areaCode, areaName } = item;
    const newChildren = item.children ? convert(item.children) : [];
    return {
      label: areaName,
      value: areaCode,
      children: newChildren,
    };
  });
};

export default () => {
  const form = useForm();
  const fn = {
    add: create,
    edit: updateInfo,
  };
  const {
    supplier: { visible, queryInfo, type },
    commonInterface: { treeList },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const update = (data) => {
    dispatch({
      type: 'supplier/update',
      payload: data,
    });
  };
  useEffect(() => {
    form.setValues({
      form1: {
        supplierName: queryInfo.supplierName || '',
        contactName: queryInfo.contactName || '',
        contactPhone: queryInfo.contactPhone || '',
        address: queryInfo.address || '',
        province: queryInfo.province && [queryInfo.province, queryInfo.city, queryInfo.district],
      },
      form2: {
        productId: queryInfo.productSelector
          ? {
              label: queryInfo.productSelector,
              value: queryInfo.productId,
            }
          : undefined,
      },
    });
  }, [visible, queryInfo]);

  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: fn[type],
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          visible: false,
          reload: true,
          type: '',
          queryInfo: {},
          relaod: true,
        });
      }
    },
  });

  const onFinish = (values) => {
    const { form1, form2 } = values;
    const params = {
      address: form1.address,
      contactName: form1.contactName,
      supplierName: form1.supplierName,
      contactPhone: form1.contactPhone,
      province: form1.province && form1.province[0] && form1.province[0],
      city: form1.province && form1.province[1] && form1.province[1],
      district: form1.province && form1.province[2] && form1.province[2],
      productId: form2.productId && form2.productId.value,
      productSelectorContact: form2.productId && form2.productId.label,
      supplierId: queryInfo.supplierId,
    };
    mutateAsync(params);
  };

  return (
    <Modal
      forceRender
      title={type === 'add' ? '新增供应商' : '编辑供应商'}
      open={visible}
      onCancel={() => update({ visible: false })}
      width={800}
      footer={
        <ButtonGroupPro
          button={[
            {
              label: '保存',
              type: 'primary',
              onClick: form.submit,
              loading: isLoading,
            },
            {
              label: '取消',
              onClick: () => update({ visible: false }),
            },
          ]}
        />
      }
    >
      <FormRender
        form={form}
        schema={schema({
          province: {
            options: convert(treeList),
          },
        })}
        onFinish={onFinish}
        widgets={{ selectUser: SelectUser, cascader: Cascader }}
      />
    </Modal>
  );
};
