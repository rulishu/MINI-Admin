import { AlipayOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons';
import Authorized from '@antdp/authorized';
import UserLogin from '@antdp/user-login';
import { history, useModel } from '@umijs/max';
import 'antd/dist/reset.css';
import logo from './logo.svg';
import { message, Form } from 'antd'
import { useReactMutation } from '@antdp/hooks';

const UserLayout = (props) => {
  const [form] = Form.useForm();
  const { store, setStore } = useModel('global', (model) => ({ ...model }));
  const mutation = useReactMutation({ url: '/api/users/login' });
  return (
    <Authorized authority={!store.token} redirectPath="/">
      <UserLogin
        logo={logo}
        form={form}
        projectName="奋斗"
        loading={props.loading}
        onFinish={async (values) => {
          const { code, token, data } = await mutation.mutateAsync(values);
          if (code === 1) {
            await sessionStorage.setItem('token', token)
            await sessionStorage.setItem('authBtn', JSON.stringify(data.btns));
            await sessionStorage.setItem('authMenu', JSON.stringify(data.menus));
            setStore({ ...store, token: token });
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
          },
          {
            label: '重置',
            attr: {
              type: 'primary',
              onClick: () => form.resetFields()
            }
          }
        ]}
      />
    </Authorized>
  );
};
export default UserLayout;