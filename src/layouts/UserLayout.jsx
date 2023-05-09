import Authorized from '@antdp/authorized';
import { useReactMutation } from '@antdp/hooks';
import UserLogin from '@antdp/user-login';
import { history, useModel } from '@umijs/max';
import { Form, message } from 'antd';
import 'antd/dist/reset.css';
import WechatLogin from './WechatLogin';
import logo from './logo.png';

const UserLayout = (props) => {
  const [form] = Form.useForm();
  const { store, setStore } = useModel('global', (model) => ({ ...model }));
  const mutation = useReactMutation({ url: '/api/users/login' });
  return (
    <Authorized authority={!store.token} redirectPath="/">
      <UserLogin
        logo={logo}
        form={form}
        projectName=""
        loading={props.loading}
        onFinish={async (values) => {
          const { code, token } = await mutation.mutateAsync(values);
          if (code === 1) {
            await sessionStorage.setItem('token', token);
            setStore({ ...store, token: token });
            history.push('/');
          } else {
            message.warning('登陆失败');
          }
        }}
        type="phone"
        formBtns={[
          {
            label: '登录',
            attr: {
              type: 'primary',
              htmlType: 'submit',
              style: {
                marginRight: 20,
              },
            },
          },
          {
            label: '重置',
            attr: {
              type: 'primary',
              onClick: () => form.resetFields(),
            },
          },
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'rgba(0,0,0,.85)', fontSize: 12, marginRight: 10 }}>
            其他方式登录:
          </span>
          <WechatLogin />
        </div>
      </UserLogin>
    </Authorized>
  );
};
export default UserLayout;
