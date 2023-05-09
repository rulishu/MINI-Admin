import { WechatOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { useEffect } from 'react';

const WechatLogin = () => {
  const handleWechatLogin = () => {
    const appID = 'wxac2e1e5f9284de27';
    const redirectURI = encodeURIComponent('http://192.168.188.205:8000/login');
    const authURL = `https://open.weixin.qq.com/connect/qrconnect?appid=${appID}&redirect_uri=${redirectURI}&response_type=code&scope=snsapi_login#wechat_redirect`;
    window.location.href = authURL;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // TODO: 将 code 和 state 发送给后端服务器以获取用户信息并完成登录或注册
      console.log('code:', code);
      // 登录成功后，跳转到首页
      // history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <WechatOutlined
      onClick={handleWechatLogin}
      style={{ marginLeft: 10, fontSize: 24, color: '#1AAD19' }}
    />
  );
};

export default WechatLogin;
