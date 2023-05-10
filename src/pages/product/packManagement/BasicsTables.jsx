import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Alert, Input, Radio, Row, Space } from 'antd';

export default function GiftTables() {
  const text = (
    <div>
      <span style={{ color: '#31708F', fontWeight: 'bold' }}>提示! </span>
      <span style={{ color: '#31708F' }}>店长收益计算模式</span>
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
      <Row justify="space-between">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space.Compact>
            <Input
              style={{
                width: 200,
              }}
              defaultValue="店长收益计算模式选择:"
              disabled
            />
            <div
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                padding: 4,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                borderWidth: 1,
                borderColor: '#D9D9D9',
                borderStyle: 'solid',
              }}
            >
              <Radio.Group>
                <Radio value={1}>按订单实付金额计算</Radio>
                <Radio value={2}>按店长所得佣金计算</Radio>
              </Radio.Group>
            </div>
          </Space.Compact>
        </Space>
      </Row>
      <ButtonGroupPro
        button={[
          {
            type: 'primary',
            label: '保存',
          },
        ]}
      />
    </div>
  );
}
