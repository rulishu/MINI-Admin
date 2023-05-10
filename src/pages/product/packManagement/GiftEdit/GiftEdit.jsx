import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import giftschema from './schema';

export default () => {
  const form = useForm();
  const {
    store: { giftVisible },
    update,
  } = useModel('packManagement', (model) => ({
    ...model,
  }));
  const handleOk = () => {};

  const onFinish = (data) => {
    console.log('data', data);
  };

  return (
    <Modal
      title="店长收益配置"
      open={giftVisible}
      onOk={handleOk}
      onCancel={() => update({ giftVisible: false })}
      footer={
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '保存',
              onClick: form.submit,
            },
            {
              type: 'primary',
              label: '取消',
              onClick: () => update({ giftVisible: false }),
            },
          ]}
        />
      }
    >
      <FormRender form={form} schema={giftschema} onFinish={onFinish} />
    </Modal>
  );
};
