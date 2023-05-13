import { create, updateInfo } from '@/service/afterSalesReasons';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';

export default () => {
  const form = useForm();
  const { visible, queryInfo, type } = useSelector((state) => state.afterSalesReasons);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'afterSalesReasons/update',
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
      title={type === 'add' ? '新增申请原因' : '编辑申请原因'}
      open={visible}
      onCancel={() => update({ visible: false })}
      width={500}
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
        schema={{
          type: 'object',
          column: 1,
          properties: {
            reason: {
              title: '申请原因',
              type: 'string',
              required: true,
            },
          },
        }}
        onFinish={onFinish}
      />
    </Modal>
  );
};
