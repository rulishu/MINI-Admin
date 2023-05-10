import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Col, Input, Row, Space, Switch } from 'antd';
import { useState } from 'react';

const Index = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const onChange = () => {
    setIsDisabled(!isDisabled);
  };
  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 100,
                  color: '#555555',
                }}
                defaultValue="设置说明:"
                disabled
              />
              <Input
                style={{
                  width: 600,
                }}
                placeholder="是否开启同步微盟积分,一但开通无法关闭,积分同步一次不能大于等于100000积分"
                disabled
              />
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch
            checkedChildren="已开启"
            unCheckedChildren="启用"
            onChange={() => {
              onChange();
            }}
          />
        </Col>
      </Row>
      <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
        <Space.Compact>
          <Input
            style={{
              width: 120,
              color: '#555555',
            }}
            defaultValue="积分商城链接:"
            disabled
          />
          <Input
            style={{
              width: 580,
            }}
            placeholder="开启积分同步开关之后,用户查看积分时跳转的链接,未填写不能开启开关"
            disabled={isDisabled}
          />
        </Space.Compact>
      </Space>
      <Row align="middle" justify="center">
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '保存',
            },
          ]}
        />
        <div style={{ fontSize: 12, color: '#999999' }}>
          {' '}
          (注：为了保证同步积分准确，同步积分开关只能开启一个，即平台积分只能够同步至一个第三方平台)
        </div>
      </Row>
    </div>
  );
};
export default Index;
