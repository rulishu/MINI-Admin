// import { useSelector } from '@umijs/max';
import { DeviceFrameset } from 'react-device-frameset';
import '/node_modules/react-device-frameset/dist/styles/marvel-devices.min.css';

export default () => {
  // const { dom } = useSelector((state) => state.bannerManage);

  return (
    <DeviceFrameset device="iPhone 8" color="gold">
      <div style={{ height: '100%', overflow: 'auto' }}>预览</div>
    </DeviceFrameset>
  );
};
