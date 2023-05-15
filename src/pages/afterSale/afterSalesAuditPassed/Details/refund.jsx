import { refund } from '@/service/afterSale/afterSalesAuditPassed';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';

export default ({ reload }) => {
  const form = useForm();
  const { refundVisible, refundInfo } = useSelector((state) => state.afterSalesAuditPassed);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'afterSalesAuditPassed/update',
      payload: data,
    });
  };

  useEffect(() => {
    form.setValues({
      amount: refundInfo.amount || 0,
    });
  }, [refundVisible, refundInfo]);

  // 退款
  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: refund,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          refundVisible: false,
          refundInfo: {},
        });
        reload();
      }
    },
  });

  const onFinish = (values) => {
    mutateAsync({ ...refundInfo, ...values });
  };

  return (
    <Modal
      title="退款"
      forceRender
      open={refundVisible}
      onCancel={() => update({ refundVisible: false })}
      width={500}
      footer={
        <ButtonGroupPro
          button={[
            {
              label: '退款',
              type: 'primary',
              onClick: form.submit,
              loading: isLoading,
            },
            {
              label: '取消',
              onClick: () => update({ refundVisible: false }),
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
            amount: {
              title: '退款金额',
              type: 'number',
              props: {
                step: 0.01,
                min: 0,
              },
              disabled: true,
              required: true,
            },
          },
        }}
        onFinish={onFinish}
      />
    </Modal>
  );
};
