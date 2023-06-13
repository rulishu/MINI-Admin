import AModal from '@/components/AModal';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect, useState } from 'react';
import EditTable from '../component/EditTable';

export default ({ reload }) => {
  const { message } = App.useApp();
  const form = useForm();
  const {
    orderManage: { pushVisible, pushData, logisticsCompanyList },
    loading,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);

  const close = () => {
    dispatch({
      type: 'orderManage/update',
      payload: {
        pushVisible: false,
      },
    });
  };

  useEffect(() => {
    if (pushVisible) {
      form.setValues({
        items: pushData.items,
        type: pushData.type,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushVisible, pushData]);

  const onFinish = (values) => {
    const params = {
      orderId: pushData.orderId,
      logisticsCompany: values.logisticsCompany,
      trackingNumber: values.trackingNumber,
      items: values.items.map((item) => ({
        totelAmount: item.amount,
        orderItemId: item.id,
        itemId: item.itemId,
        shipmentAcount: item.shipmentAcount,
        amount: item.number,
      })),
    };
    const { items } = params;
    const numberError = (items || []).findIndex((item) => !item.amount);
    if (numberError !== -1) {
      message.error('发货数量不能为空');
      return;
    }
    dispatch({
      type: 'orderManage/pushItems',
      payload: params,
      callback: () => reload?.(),
    });
  };

  const watch = {
    items: (value) => {
      setDisabled(value.length == 0 || !value);
    },
  };

  return (
    <AModal
      open={pushVisible}
      width={800}
      onCancel={close}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="cancel" onClick={close}>
            取消
          </Button>
          <Button
            disabled={disabled}
            key="save"
            type="primary"
            loading={loading.effects['orderManage/pushItems']}
            onClick={form.submit}
          >
            发货
          </Button>
        </div>
      }
    >
      <ProCard title="发货" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <FormRender
          watch={watch}
          form={form}
          widgets={{ editTable: EditTable }}
          schema={{
            type: 'object',
            properties: {
              items: {
                tooltip: '请勾选商品，否则无法发货',
                span: 24,
                type: 'array',
                title: '请选择商品',
                widget: 'editTable',
                props: {
                  loading: loading.effects['orderManage/getPushItems'],
                },
              },
              type: {
                span: 24,
                title: '发货方式',
                widget: 'radio',
                type: 'number',
                required: true,
                props: {
                  options: [
                    { label: '需要物流', value: 1 },
                    { label: '无需物流', value: 2 },
                  ],
                },
              },
              logisticsCompany: {
                span: 12,
                title: '物流公司',
                type: 'string',
                widget: 'select',
                hidden: '{{ formData.type !== 1  }}',
                required: true,
                props: {
                  options: logisticsCompanyList,
                  showSearch: true,
                  allowClear: true,
                  filterOption: (input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                },
                placeholder: '请选择物流公司',
              },
              trackingNumber: {
                span: 12,
                title: '运单号',
                type: 'string',
                hidden: '{{ formData.type !== 1  }}',
                required: true,
                placeholder: '请输入运单号',
              },
            },
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
