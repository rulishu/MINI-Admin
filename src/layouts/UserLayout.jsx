import Authorized from '@antdp/authorized';
import { useReactMutation } from '@antdp/hooks';
import UserLogin from '@antdp/user-login';
import { history, useModel } from '@umijs/max';
import { Form } from 'antd';
import 'antd/dist/reset.css';
import SignUp from './SignUp';
import logo from './logo.png';

const UserLayout = (props) => {
  const [form] = Form.useForm();
  const {
    store,
    setStore,
    // setSignVisible
  } = useModel('global', (model) => ({ ...model }));
  const mutation = useReactMutation({ url: '/jcgl-mall/mall/login/toLogin' });
  // const mutation = useReactMutation({ url: '/api/users/login' });
  return (
    <Authorized authority={!store.token} redirectPath="/">
      <UserLogin
        logo={logo}
        form={form}
        projectName=""
        loading={props.loading}
        onFinish={async (values) => {
          const { code, result, message } = await mutation.mutateAsync({
            userName: values.username,
            passWord: values.password,
            appId: 'jcgl-mall-admin',
          });
          if (code === 200) {
            await sessionStorage.setItem('token', result.access_token);
            await sessionStorage.setItem('refresh_token', result.refresh_token);
            await sessionStorage.setItem('userDate', result.userDto);
            setStore({ ...store, token: result.access_token });
            history.push('/');
          } else {
            message.warning(message);
          }
        }}
        type="account"
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
          // {
          //   label: '注册',
          //   attr: {
          //     type: 'primary',
          //     onClick: () => setSignVisible(true),
          //   },
          // },
        ]}
      >
        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'rgba(0,0,0,.85)', fontSize: 12, marginRight: 10 }}>
            其他方式登录:
          </span>
          <WechatLogin />
        </div> */}
        <SignUp />
      </UserLogin>
    </Authorized>
  );
};
export default UserLayout;
