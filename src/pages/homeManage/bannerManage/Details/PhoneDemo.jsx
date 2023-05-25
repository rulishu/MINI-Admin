import { useSelector } from '@umijs/max';
import { Carousel, Col, Row } from 'antd';
import { DeviceFrameset } from 'react-device-frameset';
import '/node_modules/react-device-frameset/dist/styles/marvel-devices.min.css';

export default () => {
  const { dom } = useSelector((state) => state.bannerManage);
  // eslint-disable-next-line no-unused-vars
  const {
    weappBannerList = [],
    activityPhoto1,
    activityPhoto2,
    activityPhoto3,
    activityPhoto4,
    activityPhoto5,
    activityPhoto6,
  } = dom;

  return (
    <DeviceFrameset device="iPhone 8" color="gold">
      <div style={{ height: '100%', overflow: 'auto' }}>
        <Carousel autoplay>
          {weappBannerList.map((item) => (
            <img key={item.id} src={item.path} alt="" width={'100%'} height={200} />
          ))}
        </Carousel>
        <div style={{ padding: '0 12px' }}>
          <Row style={{ margin: '12px 0' }}>
            {activityPhoto1 && (
              <Col span={24}>
                <img
                  src={activityPhoto1.path}
                  alt=""
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Col>
            )}
          </Row>
          <Row gutter={12}>
            {activityPhoto2 && (
              <Col span={12}>
                <img
                  src={activityPhoto2.path}
                  alt=""
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Col>
            )}
            <Col span={12}>
              <Row gutter={12}>
                {activityPhoto3 && (
                  <Col span={24}>
                    <img
                      src={activityPhoto3.path}
                      alt=""
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                  </Col>
                )}
                {activityPhoto4 && (
                  <Col span={24}>
                    <img
                      src={activityPhoto4.path}
                      alt=""
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
          <Row gutter={12}>
            {activityPhoto5 && (
              <Col span={12}>
                <img
                  src={activityPhoto5.path}
                  alt=""
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Col>
            )}
            {activityPhoto6 && (
              <Col span={12}>
                <img
                  src={activityPhoto6.path}
                  alt=""
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Col>
            )}
          </Row>
        </div>
      </div>
    </DeviceFrameset>
  );
};
