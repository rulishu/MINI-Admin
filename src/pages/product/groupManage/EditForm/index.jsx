import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';

export default () => {
  const form = useForm();
  const {
    store: { visible, queryInfo },
    update,
  } = useModel('groupManage', (model) => ({
    ...model,
  }));

  const schema = {
    type: 'object',
    properties: {
      input: {
        title: '分组名称',
        type: 'string',
        required: true,
        props: {},
      },
    },
  };

  useEffect(() => {
    form.setValues({ input: queryInfo.input });
  }, [visible, queryInfo]);

  const onFinish = (data) => {
    console.log('data', data);
  };

  return (
    <Modal
      title="分组信息"
      open={visible}
      onCancel={() => update({ visible: false })}
      footer={
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '确认',
              onClick: form.submit,
            },
            {
              type: 'primary',
              label: '取消',
              onClick: () => update({ visible: false }),
            },
          ]}
        />
      }
    >
      <FormRender form={form} schema={schema} onFinish={onFinish} />
    </Modal>
  );
};
