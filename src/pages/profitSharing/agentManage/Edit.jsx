import AModal from '@/components/AModal';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable({ tableRef }) {
  const form = useForm();
  const { visible, queryData } = useSelector((state) => state.agentManage);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'agentManage/update',
      payload: data,
    });
  };

  const onFinish = async (data) => {
    const params = {
      ...data,
      level: queryData.level,
    };
    dispatch({
      type: 'agentManage/edit',
      payload: params,
      callback: () => tableRef?.current?.reload(),
    });
  };

  return (
    <AModal
      open={visible}
      onCancel={() => update({ visible: false })}
      width={500}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" type="primary" onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ visible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard title="修改" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <FormRender form={form} schema={schema({ queryData })} onFinish={onFinish} />
      </ProCard>
    </AModal>
  );
}
