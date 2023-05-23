import AModal from '@/components/AModal';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable({ tableRef }) {
  const form = useForm();
  const { visible, queryData } = useSelector((state) => state.headquarters);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'headquarters/update',
      payload: data,
    });
  };

  const onFinish = async (data) => {
    console.log('data', data);
    dispatch({
      type: 'headquarters/edit',
      payload: {
        id: queryData.id,
        percent: data.percent,
      },
      callback: () => tableRef?.current?.reload(),
    });
  };

  return (
    <AModal
      open={visible}
      onCancel={() => update({ visible: false })}
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
      <ProCard title="修改" headerBordered>
        <FormRender form={form} schema={schema({ queryData })} onFinish={onFinish} />
      </ProCard>
    </AModal>
  );
}
