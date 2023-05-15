import { add, edit } from '@/service/cust/memberShipLevel';
import { ProCard } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable({ reload }) {
  const form = useForm();

  const { visible, type, queryData } = useSelector((state) => state.membershipLevel);

  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'membershipLevel/update',
      payload: data,
    });
  };

  /** 新增 **/
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
      await mutateAsync(data);
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
      width={800}
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
      <ProCard title={type === 'add' ? '新建会员等级' : '编辑会员等级'} headerBordered>
        <FormRender form={form} schema={schema({ queryData })} onFinish={onFinish} />
      </ProCard>
    </Modal>
  );
}
