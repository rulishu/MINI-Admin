import { ModalForm, ProFormDigit } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';

export default function SearchTable({ tableRef, data }) {
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'referrer/update',
      payload: data,
    });
  };

  const onFinish = async (formData) => {
    dispatch({
      type: 'referrer/edit',
      payload: {
        percent: formData?.inputnumber,
        id: data?.id,
      },
      callback: () => {
        tableRef?.current?.reload();
        Promise.resolve(true);
        update({ visible: false });
      },
    });
  };

  return (
    <ModalForm
      title="修改推荐人分润系数"
      width={300}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => update({ visible: false }),
      }}
      onFinish={async (formData) => {
        await onFinish(formData);
        return true;
      }}
      trigger={<span>修改</span>}
    >
      <ProFormDigit
        name="inputnumber"
        required
        min={0}
        max={100}
        initialValue={data.percent}
        fieldProps={{ precision: 0 }}
      />
    </ModalForm>
  );
}
