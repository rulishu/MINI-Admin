import { AlipayOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons';
import Authorized from '@antdp/authorized';
import UserLogin from '@antdp/user-login';
import { history, useModel } from '@umijs/max';
import 'antd/dist/reset.css';
import { useRef } from 'react';
import logo from './logo.svg';
const UserLayout = (props) => {
  const baseRef = useRef();
  const { setStore, store } = useModel('global', (model) => ({ ...model }));
  return (
    <Authorized authority={true} redirectPath="/">
      <UserLogin
        ref={baseRef}
        logo={logo}
        projectName="Antdp"
        loading={props.loading}
        onFinish={(values) => {
          setStore({
            ...store,
            token: Math.random() * (1 - 9999)
          })
          history.push('/')
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
              type: 'primary'
            }
          }
        ]}
      />
    </Authorized>
  );
};
export default UserLayout;