import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import giftschema from './schema';

export default () => {
  const form = useForm();

  const { giftVisible } = useSelector((state) => state.packManagement);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'packManagement/update',
      payload: data,
    });
  };
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
