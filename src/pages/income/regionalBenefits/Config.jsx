import { Col, Input, Row, Space, Switch } from 'antd';
import { useState } from 'react';

export default function Tables() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle">
            <Space.Compact>
              <Input
                style={{
                  width: 110,
                }}
                defaultValue="云仓提货配置"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="开启后云仓提货及转赠计入区域收益"
                disabled={isOpen}
              />
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch
            checkedChildren="已开启"
            unCheckedChildren="启用"
            defaultChecked
            onChange={(state) => {
              setIsOpen(!state);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
