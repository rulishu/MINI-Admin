import Upload from '@/components/upload';
import { create, updateInfo } from '@/service/goods/supplier';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Cascader, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { schema } from './schema';

const convert = (data) => {
  return data.map((item) => {
    // eslint-disable-next-line no-unused-vars
    const { areaCode, areaName } = item;
    const newChildren = item.children ? convert(item.children) : [];
    return {
      label: areaName,
      value: areaName,
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
  const { visible, queryInfo, type, treeList, userList } = useSelector((state) => state.supplier);
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
    // eslint-disable-next-line no-unused-vars
    const { form1, form2 } = values;
    const params = {
      address: form1.address,
      contactName: form1.contactName,
      supplierName: form1.supplierName,
      contactPhone: form1.contactPhone,
      province: form1.province && form1.province[0] && form1.province[0],
      city: form1.province && form1.province[1] && form1.province[1],
      district: form1.province && form1.province[2] && form1.province[2],
      // productSelector: form2.productSelector && form2.productSelector.label,
      id: queryInfo.supplierId,
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
          productSelector: {
            onFocus: () => {
              dispatch({
                type: 'supplier/getUserList',
                payload: {},
              });
            },
            onSearch: (value) => {
              dispatch({
                type: 'supplier/getUserList',
                payload: { userName: value },
              });
            },
            options: userList.map((item) => ({
              label: `${item.userName}-${item.mobile}`,
              value: item.userId,
            })),
          },
          province: {
            options: convert(treeList),
          },
        })}
        onFinish={onFinish}
        widgets={{ upload: Upload, cascader: Cascader }}
      />
    </Modal>
  );
};
