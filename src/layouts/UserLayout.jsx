import Authorized from '@antdp/authorized';
import { useReactMutation } from '@antdp/hooks';
import UserLogin from '@antdp/user-login';
import { history, useDispatch, useSelector } from '@umijs/max';
import { message } from 'antd';
import 'antd/dist/reset.css';
import logo from './logo.png';

const UserLayout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.global);
  const update = (data) => {
    dispatch({
      type: 'global/update',
      payload: data,
    });
  };
  const mutation = useReactMutation({ url: '/jcgl-mall/mall/login/toLogin' });
  return (
    <Authorized authority={!token} redirectPath="/">
      <UserLogin
        logo={logo}
        projectName=""
        loading={mutation.isLoading}
        onFinish={async (values) => {
          const {
            code,
            result,
            message: msg,
          } = await mutation.mutateAsync({
            userName: values.username,
            passWord: values.password,
            appId: 'jcgl-mall-admin',
          });
          if (code && code === 200) {
            await sessionStorage.setItem('token', result.access_token);
            await sessionStorage.setItem('refresh_token', result.refresh_token);
            await sessionStorage.setItem('userDate', result.userDto);
            update({ token: result.access_token });
            history.push('/');
          } else {
            message.warning(msg);
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
        ]}
      />
    </Authorized>
  );
};
export default UserLayout;
