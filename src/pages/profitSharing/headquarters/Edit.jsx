import AModal from '@/components/AModal';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, message } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './columns';

export default function SearchTable({ tableRef }) {
  const form = useForm();
  const { visible, queryData } = useSelector((state) => state.headquarters);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const update = (data) => {
    dispatch({
      type: 'headquarters/update',
      payload: data,
    });
  };

  const onFinish = async (data) => {
    console.log(data);
    const { areaLevelPercent, cityLevelPercent, provinceLevelPercent, totalPercent } = data;
    if (areaLevelPercent + cityLevelPercent + provinceLevelPercent > 100) {
      messageApi.open({
        type: 'error',
        content: '会员分润系数大于100%',
      });
    } else {
      dispatch({
        type: 'headquarters/edit',
        payload: {
          areaLevelPercent,
          cityLevelPercent,
          provinceLevelPercent,
          totalPercent,
          callback: tableRef?.current?.reload,
        },
      });
    }
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
      {contextHolder}
      <ProCard title="修改" headerBordered>
        <FormRender form={form} schema={schema({ queryData })} onFinish={onFinish} />
      </ProCard>
    </AModal>
  );
}
