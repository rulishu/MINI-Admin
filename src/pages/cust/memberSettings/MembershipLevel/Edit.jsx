import { add, edit } from '@/service/memberShipLevel';
import { ProCard } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useModel } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable({ reload }) {
  const form = useForm();

  const {
    store: { visible, type, queryData },
    update,
  } = useModel('memberShipLevel', (model) => ({ ...model }));

  /** 新增 **/
  const { mutateAsync } = useReactMutation({
    url: add,
    method: 'POST',
    onSuccess: ({ code }) => {
      if (code === 200) {
        update({ visible: false });
        reload();
      }
    },
  });

  const onFinish = async (data) => {
    if (type === 'add') {
      await mutateAsync(data);
    }
    if (type === 'edit') {
      const { code } = await edit({
        ...data,
        id: queryData?.id,
      });
      if (code === 200) {
        update({ visible: false });
        reload();
      }
    }
  };

  return (
    <Modal
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
              label: '取消',
              onClick: () => update({ visible: false }),
            },
          ]}
        />
      }
    >
      <ProCard
        title={type === 'add' ? '新建会员等级' : '编辑会员等级'}
        style={{ maxWidth: '100%' }}
        headerBordered
      >
        <FormRender form={form} schema={schema({ queryData })} onFinish={onFinish} />
      </ProCard>
    </Modal>
  );
}
