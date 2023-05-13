import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function Edit() {
  const form = useForm();
  const dispatch = useDispatch();
  const { visible, queryData } = useSelector((state) => state.list);

  const handleCancel = () => {
    dispatch({
      type: 'list/update',
      payload: {
        visible: false,
      },
    });
  };
  return (
    <Modal open={visible} onCancel={handleCancel} footer={false} width={600}>
      <ProCard title="订单详情" style={{ with: '100%' }} headerBordered>
        <FormRender form={form} schema={schema({ queryData })} footer={false} readOnly={true} />
      </ProCard>
    </Modal>
  );
}
