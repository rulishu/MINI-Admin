import { add, edit } from '@/service/tagsManage';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useModel } from '@umijs/max';
import { Form } from 'antd';
import { useRef } from 'react';
import Tags from './components/Tags';

export default function Edit() {
  const ref = useRef();
  const {
    visible,
    setVisible,
    store: { queryInfo, type },
  } = useModel('tagsManage', (model) => ({ ...model }));

  /** 新增编辑接口 **/
  const mutation = useReactMutation({
    url: type === 'edit' ? edit : add,
    onSuccess: ({ code }) => {
      if (code === 1) {
        setVisible(false);
      }
    },
  });

  return (
    <ModalForm
      formRef={ref}
      title={type === 'edit' ? '编辑标签' : '新增标签'}
      open={visible}
      onOpenChange={setVisible}
      modalProps={{
        destroyOnClose: true,
      }}
      initialValues={queryInfo}
      onFinish={async (values) => {
        await mutation.mutateAsync(values);
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
