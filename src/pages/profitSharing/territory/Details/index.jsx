import { create, updateInfo } from '@/service/afterSale/afterSalesReasons';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Cascader, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';

function filterData(data) {
  return data
    .map((item) => {
      if (item.children) {
        item.children = filterData(item.children);
        if (item.children.length === 0) {
          delete item.children;
        }
      }
      return { label: item.label, value: item.value, children: item.children };
    })
    .filter((item) => item.children || item.value.endsWith('0000') || item.value.endsWith('00'));
}

export default () => {
  const form = useForm();
  const {
    territory: { visible, queryInfo, type },
    commonInterface: { treeList },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'territory/update',
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

  const watch = {
    reason2: () => {
      form.setValues({ reason3: [] });
    },
  };

  return (
    <Modal
      forceRender
      title={type === 'add' ? '新增' : '编辑'}
      open={visible}
      onCancel={() => update({ visible: false })}
      width={500}
      footer={[
        <Button type="primary" loading={isLoading} onClick={form.submit}>
          保存
        </Button>,
        <Button onClick={() => update({ visible: false })}>取消</Button>,
      ]}
    >
      <FormRender
        form={form}
        watch={watch}
        widgets={{ cascader: Cascader }}
        schema={{
          type: 'object',
          column: 1,
          properties: {
            reason1: {
              title: '代理商',
              type: 'string',
              widget: 'select',
              required: true,
              props: {
                options: [],
              },
              placeholder: '请选择代理商',
            },
            reason2: {
              title: '代理级别',
              type: 'string',
              widget: 'select',
              required: true,
              props: {
                allowClear: true,
                options: [
                  { label: '省级', value: '0' },
                  { label: '市级', value: '1' },
                  { label: '区县级', value: '2' },
                ],
              },
              placeholder: '请选择代理级别',
            },
            reason3: {
              title: '代理地盘',
              type: 'array',
              widget: 'cascader',
              required: true,
              props: {
                options: filterData(treeList),
                maxTagCount: 3,
                multiple: true,
              },
              disabled: '{{ !formData.reason2 }}',
              placeholder: '请选择代代理地盘',
            },
          },
        }}
        onFinish={onFinish}
      />
    </Modal>
  );
};
