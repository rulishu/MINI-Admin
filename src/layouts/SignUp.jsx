import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

export default function Page() {
  const { signVisible, setSignVisible } = useModel('global', (model) => ({ ...model }));
  return (
    <ModalForm
      title="注册"
      open={signVisible}
      onOpenChange={setSignVisible}
      modalProps={{
        destroyOnClose: true,
        width: 400,
      }}
      onFinish={async () => {}}
    >
      <ProFormText
        name="name"
        label="用户名"
        placeholder={'请输入用户名'}
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      />
      <ProFormText
        name="password"
        label="密码"
        placeholder={'请输入密码'}
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      />
    </ModalForm>
  );
}
