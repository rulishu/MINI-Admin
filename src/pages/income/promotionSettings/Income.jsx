import { Alert, Button, Col, Input, Row, Select, Space, Switch } from 'antd';

const IncomeSetting = () => {
  const text = (
    <div>
      <span style={{ color: '#31708F', fontWeight: 'bold' }}>
        说明：用户进行推广海报、推荐下载APP、社群海报分享、推荐用户完成公众号登录时可配置对应奖励，奖励发放给上级。
      </span>
    </div>
  );
  const options = [
    {
      value: '1',
      label: '佣金',
    },
    {
      value: '2',
      label: '积分',
    },
  ];
  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: 10 }}>
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Alert message={text} type="info" closable />
        </Space>
      </Row>
      {/* 推荐好友成为平台用户 */}
      <Row justify="space-between" style={{ marginBottom: 30 }}>
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="场景一：推荐好友成为平台用户"
                placeholder="推广分享给朋友完成注册"
                disabled
              />
            </Space.Compact>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="收益方式:"
                placeholder="积分"
                disabled
              />
              <Select defaultValue="收益方式" options={options} />
            </Space.Compact>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="一级推广收益:"
                addonAfter="积分/金额(元)"
                defaultValue="50"
              />
              <Input
                style={{
                  width: 400,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                addonBefore="二级推广收益:"
                addonAfter="积分/金额(元)"
                defaultValue="0"
              />
              <Button type="primary">保存</Button>
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
      {/* 公众号关注 */}
      <Row justify="space-between" style={{ marginBottom: 30 }}>
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="场景二：公众号关注"
                placeholder="推广分享给朋友完成注册"
                disabled
              />
            </Space.Compact>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="收益方式:"
                placeholder="积分"
                disabled
              />
              <Select defaultValue="收益方式" options={options} />
            </Space.Compact>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="一级推广收益:"
                addonAfter="积分/金额(元)"
                defaultValue="50"
              />
              <Input
                style={{
                  width: 400,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                addonBefore="二级推广收益:"
                addonAfter="积分/金额(元)"
                defaultValue="0"
              />
              <Button type="primary">保存</Button>
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
      {/* 场景三：推荐好友扫码社群海报入群 */}
      <Row justify="space-between" style={{ marginBottom: 30 }}>
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="场景三：推荐好友扫码社群海报入群"
                placeholder="推广分享给朋友完成注册"
                disabled
              />
            </Space.Compact>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="收益方式:"
                placeholder="积分"
                disabled
              />
              <Select defaultValue="收益方式" options={options} />
            </Space.Compact>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="一级推广收益:"
                addonAfter="积分/金额(元)"
                defaultValue="50"
              />
              <Input
                style={{
                  width: 400,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                addonBefore="二级推广收益:"
                addonAfter="积分/金额(元)"
                defaultValue="0"
              />
              <Button type="primary">保存</Button>
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
      {/* 场景四：推荐好友首次登录APP */}
      <Row justify="space-between" style={{ marginBottom: 30 }}>
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="场景四：推荐好友首次登录APP"
                placeholder="推广分享给朋友完成注册"
                disabled
              />
            </Space.Compact>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="收益方式:"
                placeholder="积分"
                disabled
              />
              <Select defaultValue="收益方式" options={options} />
            </Space.Compact>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                addonBefore="一级推广收益:"
                addonAfter="积分/金额(元)"
                defaultValue="50"
              />
              <Input
                style={{
                  width: 400,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                addonBefore="二级推广收益:"
                addonAfter="积分/金额(元)"
                defaultValue="0"
              />
              <Button type="primary">保存</Button>
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
    </div>
  );
};
export default IncomeSetting;
