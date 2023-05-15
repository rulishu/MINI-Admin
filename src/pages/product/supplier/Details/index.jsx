import Upload from '@/components/upload';
import { create, updateInfo } from '@/service/afterSalesReasons';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { schema } from './schema';

export default () => {
  const form = useForm();
  const { visible, queryInfo, type } = useSelector((state) => state.supplier);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'supplier/update',
      payload: data,
    });
  };
  const fn = {
    add: create,
    edit: updateInfo,
  };
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

  useEffect(() => {
    form.setValues({
      reason: queryInfo.reason || '',
    });
    if (type === 'add') {
      form.removeErrorField('form2.contract');
      form.removeErrorField('form2.id');
      form.removeErrorField('form2.identityCard');
      form.removeErrorField('form2.businessLicense');
      form.removeErrorField('form2.foodProductioLicense');
      form.removeErrorField('form2.foodBusinessLicense');
      form.removeErrorField('form2.certificates');
      form.removeErrorField('form2.testReport');
      form.removeErrorField('form2.promotionMaterials');
    }
  }, [visible, queryInfo]);

  const onFinish = (values) => {
    mutateAsync({
      ...values,
      id: queryInfo.id,
    });
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
      <FormRender form={form} schema={schema} onFinish={onFinish} widgets={{ upload: Upload }} />
    </Modal>
  );
};
