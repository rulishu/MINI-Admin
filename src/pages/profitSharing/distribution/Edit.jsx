import AModal from '@/components/AModal';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable({ tableRef }) {
  const form = useForm();
  const { visible, queryData } = useSelector((state) => state.distribution);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'distribution/update',
      payload: data,
    });
  };

  const onFinish = async (data) => {
    const { percent, onePercent, twoPercent } = data;
    if (percent + onePercent + twoPercent > 100) {
      message.warning('经销商润系数大于100%');
    } else {
      dispatch({
        type: 'distribution/edit',
        payload: {
          configType: queryData.configType,
          id: queryData.id,
          percent,
          onePercent,
          twoPercent,
        },
        callback: () => tableRef?.current?.reload(),
      });
    }
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
