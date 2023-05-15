import { add, edit } from '@/service/cust/equityRules';
import { ProCard } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable({ reload }) {
  const form = useForm();
  const { visible, type, queryData } = useSelector((state) => state.equityRules);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'equityRules/update',
      payload: data,
    });
  };

  /** 新增/编辑 **/
  const { mutateAsync } = useReactMutation({
    url: add,
    method: 'POST',
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({ visible: false });
        reload();
      }
    },
  });
  const onFinish = async (data) => {
    if (type === 'add') {
      mutateAsync(data);
    }
    if (type === 'edit') {
      const { code } = await edit({
        ...data,
        id: queryData?.id,
      });
      if (code && code === 200) {
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
              // type: 'primary',
              label: '取消',
              onClick: () => update({ visible: false }),
            },
          ]}
        />
      }
    >
      <ProCard
        title={type === 'add' ? '新增会员权益' : '编辑会员权益'}
        style={{ maxWidth: '100%' }}
        headerBordered
      >
        <FormRender form={form} schema={schema({ queryData })} onFinish={onFinish} />
      </ProCard>
    </Modal>
  );
}
