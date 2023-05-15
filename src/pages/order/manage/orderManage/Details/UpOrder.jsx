import { odd } from '@/service/order/orderManage';
import { ProCard } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { schemaUpOrder } from './items';

export default function UpOrder() {
  const form = useForm();
  const dispatch = useDispatch();
  const { upVisible, queryData, companySelect, type } = useSelector((state) => state.orderManage);

  useEffect(() => {
    if (upVisible === true) {
      dispatch({
        type: 'orderManage/all',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upVisible]);

  const handleCancel = () => {
    dispatch({
      type: 'orderManage/update',
      payload: {
        upVisible: false,
        queryData: {},
      },
    });
  };

  const onFinish = async (data) => {
    if (type === 'upOrder') {
      // eslint-disable-next-line no-unused-vars
      const { code, result } = await odd({
        ...data,
        id: queryData?.id,
      });
      if (code === 200) {
        handleCancel();
        dispatch({
          type: 'orderManage/update',
          payload: {
            reload: true,
          },
        });
      }
    }
  };
  return (
    <Modal
      open={upVisible}
      onCancel={handleCancel}
      width={600}
      footer={
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '确认',
              onClick: form.submit,
            },
            {
              label: '取消',
              onClick: () => handleCancel(),
            },
          ]}
        />
      }
    >
      <ProCard title="上传单号" style={{ with: '100%' }} headerBordered>
        <FormRender form={form} schema={schemaUpOrder({ companySelect })} onFinish={onFinish} />
      </ProCard>
    </Modal>
  );
}
