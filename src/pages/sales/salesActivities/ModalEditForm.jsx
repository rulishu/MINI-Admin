import {
  ModalForm,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormDigitRange,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { message } from 'antd';
import { useRef } from 'react';

export default () => {
  const dispatch = useDispatch();

  const formRef = useRef();
  const { salesActivities } = useSelector((state) => state);
  const { visible } = salesActivities;

  const update = (data) => {
    dispatch({
      type: 'salesActivities/updateState',
      payload: data,
    });
  };

  return (
    <>
      <ModalForm
        title="新建表单"
        open={visible}
        formRef={formRef}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        layout="horizontal"
        modalProps={{
          destroyOnClose: true,
          width: 1000,
          centered: true,
          afterOpenChange: (open) => {
            if (open) {
              formRef?.current?.setFieldsValue({});
            }
          },
        }}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        onOpenChange={(open) => {
          update({
            visible: open,
          });
        }}
      >
        <ProFormText
          name="name"
          label="优惠券名称"
          required
          rules={[{ required: true, message: '优惠券名称不能为空' }]}
          // tooltip="最长为 24 位"
          placeholder="最多输入20个汉字（40字符）"
          fieldProps={{
            maxLength: 40,
          }}
        />

        <ProFormDateTimeRangePicker name="datetimeRange" label="领取时间" />
        <ProFormSelect
          name="select"
          label=" "
          valueEnum={{
            open: '未解决',
            closed: '已解决',
          }}
          placeholder="Please select a country"
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormDateTimeRangePicker name="datetimeRange" label=" " />
        <div>优惠设置</div>
        <ProFormSelect
          name="select"
          label="优惠内容*"
          valueEnum={{
            open: '未解决',
            closed: '已解决',
          }}
          placeholder="Please select a country"
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormDigitRange label=" " name="input-number-range" />
        <ProFormDigit label="发放量" name="input-number" min={1} max={10} />
      </ModalForm>
    </>
  );
};
