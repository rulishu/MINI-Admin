import { add } from '@/service/equityRules';
import { QuickForm } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useModel } from '@umijs/max';
import { Form, Modal } from 'antd';
import { schema } from './columns';

export default function SearchTable({ reload }) {
  const [form] = Form.useForm();

  const {
    store: { visible, queryData },
    update,
  } = useModel('equityRules', (model) => ({ ...model }));

  /** 新增/编辑 **/
  const mutation = useReactMutation({
    url: add,
    mutationKey: ['user'],
    onSuccess: ({ code }) => {
      if (code === 200) {
        update({ visible: false });
        reload();
      }
    },
  });

  const onCancel = () => update({ visible: false, queryData: {}, type: '' });
  const onOk = async () => {
    // 触发校验
    await form?.validateFields();
    const values = form?.getFieldsValue();
    mutation.mutateAsync(values);
  };
  return (
    <Modal open={visible} onCancel={onCancel} onOk={onOk}>
      <QuickForm
        header="新增会员权益"
        type="CardPro"
        // ref={baseRef}
        form={form}
        colspan={1}
        layout="horizontal"
        formDatas={schema(queryData)}
      />
    </Modal>
  );
}
