import { add } from '@/service/equityRules';
import { QuickForm } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useModel } from '@umijs/max';
import { Form, Modal } from 'antd';
import { schema } from './columns';

export default function SearchTable({ reload }) {
  const [form] = Form.useForm();

  const {
    store: { visible, type },
    update,
  } = useModel('equityRules', (model) => ({ ...model }));

  /** 新增/编辑 **/
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

  const onCancel = () => {
    form?.resetFields();
    update({ queryData: {} });

    update({ visible: false, type: '', queryData: {} });
  };
  const onOk = async () => {
    // 触发校验
    await form?.validateFields();
    const values = form?.getFieldsValue();
    mutateAsync(values);
  };

  return (
    <Modal destroyOnClose open={visible} onCancel={onCancel} onOk={onOk}>
      <QuickForm
        header={type === 'add' ? '新增会员权益' : '编辑会员权益'}
        type="CardPro"
        // ref={baseRef}
        form={form}
        colspan={1}
        layout="horizontal"
        formDatas={schema()}
      />
    </Modal>
  );
}
