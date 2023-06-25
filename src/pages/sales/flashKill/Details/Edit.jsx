import AModal from '@/components/AModal';
import SalesGoods from '@/components/SalesGoods';
import { create, updateInfo } from '@/service/cust/agentManagement';
import { ProCard } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { hideEnum } from '../enum';

export default () => {
  const form = useForm();
  const {
    flashKill: { visible, queryInfo, type },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'flashKill/update',
      payload: data,
    });
  };

  const fn = {
    add: create,
    edit: updateInfo,
  };

  // eslint-disable-next-line no-unused-vars
  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: fn[type],
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          visible: false,
          type: '',
          queryInfo: {},
        });
      }
    },
  });

  useEffect(() => {
    if (visible) {
      form.setValues({
        form1: {},
        form2: {},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, queryInfo]);

  const onFinish = (values) => {
    console.log('values', values);
  };

  return (
    <AModal
      open={visible}
      width={1000}
      onCancel={() => update({ visible: false })}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" type="primary" loading={isLoading} onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ visible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard
        title={type === 'add' ? '新增' : '修改'}
        headerBordered
        bodyStyle={{ paddingBottom: 0 }}
      >
        <FormRender
          form={form}
          labelWidth={120}
          maxWidth={250}
          widgets={{
            saleGoods: SalesGoods,
          }}
          schema={{
            type: 'object',
            displayType: 'row',
            properties: {
              form1: {
                type: 'object',
                widget: 'lineTitle',
                title: '基本规则',
                properties: {
                  name: {
                    title: '活动名称',
                    type: 'string',
                    required: true,
                    span: 24,
                    props: {
                      allowClear: true,
                    },
                    placeholder: '请输入活动名称',
                  },
                  time: {
                    title: '活动时间',
                    type: 'range',
                    required: true,
                    widget: 'dateRange',
                    span: 24,
                    props: {
                      showTime: true,
                      format: 'YYYY-MM-DD HH:mm:ss',
                    },
                  },
                },
              },
              form2: {
                type: 'object',
                widget: 'lineTitle',
                title: '优惠规则',
                properties: {
                  number: {
                    title: '每人每种限购',
                    type: 'number',
                    widget: 'inputNumber',
                    required: true,
                    span: 24,
                    props: {
                      min: 0,
                      addonBefore: '件',
                      step: 1,
                    },
                  },
                  list: {
                    title: '选择商品',
                    required: true,
                    span: 24,
                    type: 'array',
                    widget: 'saleGoods',
                  },
                  status: {
                    title: '显示状态',
                    type: 'string',
                    widget: 'radio',
                    span: 24,
                    props: {
                      options: Object.keys(hideEnum).map((key) => ({
                        label: hideEnum[key].text,
                        value: parseInt(key),
                      })),
                    },
                  },
                },
              },
            },
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
