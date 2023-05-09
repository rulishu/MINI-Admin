import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Authorized from '@antdp/authorized';
import BasicLayout from '@antdp/basic-layouts';
import { history, useModel } from '@umijs/max';
import 'antd/dist/reset.css';

const Layout = () => {
  const { setStore, store } = useModel('global', (model) => ({ ...model }));
  return (
    <Authorized authority={!!store.token} redirectPath="/login">
      <BasicLayout
        projectName="奋斗"
        profile={{
          name: '埋名',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        }}
        siderWidth={240}
        topRightMenu={[
          {
            title: '个人中心',
            icon: <UserOutlined />,
            onClick: () => {},
          },
          {
            title: '个人设置',
            link: '/setting/property',
            icon: <SettingOutlined />,
          },
          {
            divider: true,
          },
          {
            title: '退出登录',
            icon: <LogoutOutlined />,
            onClick: async () => {
              await sessionStorage.removeItem('token');
              setStore({ ...store, token: '' });
              history.push('/login');
            },
          },
        ]}
      />
    </Authorized>
  );
};
export default Layout;
