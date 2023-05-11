import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable() {
  const form = useForm();
  const {
    store: { visible, queryData },
    update,
  } = useModel('memberManage', (model) => ({ ...model }));

  const handleCancel = () => update({ visible: false });

  return (
    <Modal open={visible} onCancel={handleCancel} footer={false}>
      <ProCard
        title="会员用户详情"
        // extra="extra"
        // tooltip="这是提示"
        style={{ maxWidth: '100%' }}
        headerBordered
      >
        <FormRender form={form} schema={schema({ queryData })} footer={false} readOnly={true} />
      </ProCard>
    </Modal>
  );
}
