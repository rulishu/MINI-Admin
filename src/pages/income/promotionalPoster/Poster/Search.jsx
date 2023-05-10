import { Alert, Checkbox, Col, Input, Row, Space, Switch } from 'antd';

const Search = () => {
  const text = (
    <div>
      <span style={{ color: '#31708F', fontWeight: 'bold' }}>
        提示：推广海报中,灵活遵循《广告法》,《微信公众平台运营规范》,谨慎使用“提成”,“分佣”等敏感词,勿使用极限用语“最高级”,“国家级”等，违反广告法条例的广告行为。
      </span>
      {/* <span style={{ color: '#FF0000' }}> */}
      {/* </span> */}
    </div>
  );
  const onChange = () => {};
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
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 20 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 400,
                }}
                defaultValue="开启后可以自定义可以分享海报的零售等级，只有勾选了的等级才可以分享店铺海报"
                disabled
              />
              <Input
                style={{
                  width: 100,
                }}
                placeholder="等级设置"
                disabled
              />
            </Space.Compact>
            <Space.Compact>
              <Row style={{ width: '100%' }}>
                <Col>
                  <Checkbox value="a">奋斗者</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="b">县代</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="c">省分公司</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="d">二级经销商</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="e">地代</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="f">一级经销商</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="h">VIP奋斗者</Checkbox>
                </Col>
              </Row>
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 100,
                }}
                defaultValue="素材分享:"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="海报素材分享功能"
                disabled
              />
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 100,
                }}
                defaultValue="微信分享:"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="海报分享至微信和朋友圈"
                disabled
              />
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 100,
                }}
                defaultValue="推送海报:"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="粉丝升级后公众号推送新海报(有风险慎重开启)"
                disabled
              />
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 100,
                }}
                defaultValue="跳转链接:"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="已经关注公众号会员，扫描个人海报跳转链接(双击修改)"
                disabled
              />
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 100,
                  marginRight: 20,
                }}
                defaultValue="海报按钮:"
                disabled
              />
              <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                  <Col>
                    <Checkbox value="a">更换海报</Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="b">刷新</Checkbox>
                  </Col>
                  <Col>
                    <Checkbox value="c">链接</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
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
export default Search;
