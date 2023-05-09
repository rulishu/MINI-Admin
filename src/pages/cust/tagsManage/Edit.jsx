import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Form } from 'antd';
import { useRef } from 'react';
import Tags from './components/Tags';

export default function Edit() {
  const ref = useRef();
  const {
    visible,
    setVisible,
    store: { queryInfo },
  } = useModel('tagsManage', (model) => ({ ...model }));

  return (
    <ModalForm
      formRef={ref}
      title="新增标签"
      open={visible}
      onOpenChange={setVisible}
      modalProps={{
        destroyOnClose: true,
        afterOpenChange: () => {
          ref?.current?.setFieldsValue({ ...queryInfo });
        },
      }}
      onFinish={(values) => {
        console.log('values', values);
      }}
    >
      <ProFormText
        name="name"
        label="标签分类"
        tooltip="不超过6个字符"
        fieldProps={{
          maxLength: 6,
        }}
        placeholder={'请输入标签分类'}
        rules={[
          {
            required: true,
            message: '请输入签分类!',
          },
        ]}
      />
      <Form.Item name="tags" label="子标签">
        <Tags />
      </Form.Item>
    </ModalForm>
  );
}
