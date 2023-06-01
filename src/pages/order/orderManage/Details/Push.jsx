import AModal from '@/components/AModal';
import { ProCard } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import EditTable from '../component/EditTable';

export default () => {
  const form = useForm();
  const {
    orderManage: { pushVisible, pushData, companySelect },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'orderManage/update',
      payload: data,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: null,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          visible: false,
          reload: true,
          type: '',
          pushData: {},
        });
      }
    },
  });

  useEffect(() => {
    if (pushVisible) {
      form.setValues({
        list: pushData.list,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushVisible, pushData]);

  const onFinish = (values) => {
    console.log('values', values);
  };

  return (
    <AModal
      open={pushVisible}
      width={700}
      onCancel={() => update({ pushVisible: false })}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" type="primary" loading={isLoading} onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ pushVisible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard title="发货" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <FormRender
          form={form}
          widgets={{ editTable: EditTable }}
          schema={{
            type: 'object',
            properties: {
              list: {
                span: 24,
                type: 'array',
                title: '请选择商品',
                widget: 'editTable',
                props: {},
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
                  options: companySelect,
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