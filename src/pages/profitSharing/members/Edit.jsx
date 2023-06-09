import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { cloneElement, useEffect } from 'react';
import { schema } from './columns';

export default function SearchTable({ tableRef }) {
  const form = useForm();
  const { message } = App.useApp();
  const { visible, queryData } = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'members/update',
      payload: data,
    });
  };
  useEffect(() => {
    if (visible) {
      form.setValues({ ...queryData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onFinish = async (data) => {
    const { areaLevelPercent, cityLevelPercent, provinceLevelPercent, totalPercent } = data;
    if (areaLevelPercent + cityLevelPercent + provinceLevelPercent > 100) {
      message.warning('省市区系数总和不能大于100');
    } else {
      dispatch({
        type: 'members/edit',
        payload: {
          areaLevelPercent,
          cityLevelPercent,
          provinceLevelPercent,
          totalPercent,
        },
        callback: () => tableRef?.current?.reload(),
      });
    }
  };
  const modalRender = (comps) => {
    return cloneElement(comps, {
      ...comps.props,
      style: {
        padding: 0,
      },
    });
  };
  return (
    <Modal
      open={visible}
      width={480}
      modalRender={modalRender}
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
      <ProCard title="修改" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <FormRender form={form} schema={schema({ queryData })} onFinish={onFinish} />
      </ProCard>
    </Modal>
  );
}
