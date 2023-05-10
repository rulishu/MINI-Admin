import { Alert, Button, Col, Input, Row, Space, Switch } from 'antd';

const IncomeSetting = () => {
  const text = (
    <div>
      <span style={{ color: '#31708F', fontWeight: 'bold' }}>
        提示!
        开启【有效推广直粉】时，超过【当天的有效推广直粉】或【总有效推广直粉】人数限制，再推广直粉不会有推广收益，同时也不会有【顾客加入成功通知】消息，但不影响订单收益！
      </span>
    </div>
  );

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
                addonBefore="当天有效推广直粉:"
                addonAfter="人"
                placeholder="请输入每天有效直粉数"
              />
              <Input
                style={{
                  width: 400,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                addonBefore="总有效推广直粉:"
                addonAfter="人"
                placeholder="请输入最大有效直粉数"
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
