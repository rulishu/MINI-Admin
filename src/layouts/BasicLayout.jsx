import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import Authorized from '@antdp/authorized';
import BasicLayout from '@antdp/basic-layouts';
import { history, useDispatch, useSelector } from '@umijs/max';
import 'antd/dist/reset.css';
import logo from './fendouzhilu-logo.png';

const Layout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.global);
  const update = (data) => {
    dispatch({
      type: 'global/update',
      payload: data,
    });
  };
  return (
    <Authorized authority={!!token} redirectPath="/login">
      <BasicLayout
        projectName="奋斗之露"
        theme="dark"
        logo={logo}
        profile={{
          name: '埋名',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        }}
        siderWidth={208}
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
              await sessionStorage.removeItem('refresh_token');
              await sessionStorage.removeItem('userDate');
              update({ token: '' });
              history.push('/login');
            },
          },
        ]}
      />
    </Authorized>
  );
};
export default Layout;
