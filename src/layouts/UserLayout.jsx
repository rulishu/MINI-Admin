import { AlipayOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons';
import Authorized from '@antdp/authorized';
import UserLogin from '@antdp/user-login';
import { history } from '@umijs/max';
import 'antd/dist/reset.css';
import logo from './logo.svg';
import { message } from 'antd'
import { useReactMutation } from '@antdp/hooks';

const styles = { height: '100%' }

const UserLayout = (props) => {
  const mutation = useReactMutation({ url: '/api/users/login' });
  return (
    <Authorized authority={true} redirectPath="/">
      <UserLogin
        logo={logo}
        projectName="奋斗"
        loading={props.loading}
        onFinish={async (values) => {
          const { code, token, data } = await mutation.mutateAsync(values);
          if (code === 1) {
            await sessionStorage.setItem('token', token)
            await sessionStorage.setItem('authBtn', JSON.stringify(data.btns));
            await sessionStorage.setItem('authMenu', JSON.stringify(data.menus));
            history.push('/')
          } else {
            message.warning('登陆失败')
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
                marginRight: 20
              }
            }
          }
        ]}
      />
    </Authorized>
  );
};
export default UserLayout;