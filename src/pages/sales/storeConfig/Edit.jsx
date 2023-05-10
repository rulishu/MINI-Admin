import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import schema from './schema';

export default () => {
  const form = useForm();
  const {
    store: { visible },
    update,
  } = useModel('storeConfig', (model) => ({
    ...model,
  }));
  const handleOk = () => {};

  const onFinish = (data) => {
    console.log('data', data);
  };

  return (
    <Modal
      title="视频号小店配置"
      open={visible}
      onOk={handleOk}
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
