import { ProCard } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable({ tableRef }) {
  const form = useForm();
  const { visible, queryData } = useSelector((state) => state.agent);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'agent/update',
      payload: data,
    });
  };

  const onFinish = async (data) => {
    if (data.sendPercent + data.putPercent > 100) {
      message.warning('总分润系数大于1');
      return;
    }
    const params = {
      ...data,
      level: queryData.level,
    };
    dispatch({
      type: 'agent/edit',
      payload: params,
      callback: () => tableRef?.current?.reload,
    });
  };

  return (
    <Modal
      open={visible}
      onCancel={() => update({ visible: false })}
      width={500}
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
      <ProCard title="修改" headerBordered>
        <FormRender form={form} schema={schema({ queryData })} onFinish={onFinish} />
      </ProCard>
    </Modal>
  );
}
