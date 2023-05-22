import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable({ tableRef }) {
  const form = useForm();
  const { visible, queryData } = useSelector((state) => state.referrer);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'referrer/update',
      payload: data,
    });
  };

  const onFinish = async (data) => {
    dispatch({
      type: 'referrer/edit',
      payload: {
        percent: data?.input,
        id: queryData?.id,
        callback: tableRef?.current?.reload,
      },
    });
  };

  return (
    <Modal
      open={visible}
      onCancel={() => update({ visible: false })}
      width={500}
      footer={[
        <Button type="primary" onClick={form.submit}>
          保存
        </Button>,
        <Button onClick={() => update({ visible: false })}>取消</Button>,
      ]}
    >
      <ProCard title="修改" headerBordered>
        <FormRender form={form} schema={schema({ queryData })} onFinish={onFinish} />
      </ProCard>
    </Modal>
  );
}
