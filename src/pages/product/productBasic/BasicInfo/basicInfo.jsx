import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Card, Checkbox, Form, InputNumber, Radio, Row, Select, Switch } from 'antd';
import '../less.css';
const { Option } = Select;

const BasicInfo = () => {
  const onFinish = (values) => {
    console.log(111, values);
  };

  return (
    <>
      {/* 展示设置 */}
      <Card style={{ width: '100%' }} title="展示设置" bordered={false}>
        <Form name="validate_other" onFinish={onFinish} style={{ marginLeft: 50 }}>
          <Form.Item name="switch" label="等级价格" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="radio-group" label="普通商品">
            <Radio.Group>
              <Radio value="a">无样式</Radio>
              <Radio value="b">样式1</Radio>
              <Radio value="c">样式2</Radio>
              <Radio value="d">样式3</Radio>
              <Radio value="e">样式4</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="select" label="搜索设置">
            <Select placeholder="请选择" style={{ width: '20%' }}>
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
          <Form.Item name="radio-group" label="分享赚">
            <Radio.Group>
              <Radio value="a">开启</Radio>
              <Radio value="b">关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="radio-group" label="商品销量">
            <Radio.Group>
              <Radio value="a">开启</Radio>
              <Radio value="b">关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="radio-group" label="显示零售价">
            <Radio.Group>
              <Radio value="a">开启</Radio>
              <Radio value="b">关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="radio-group" label="显示销售商">
            <Radio.Group>
              <Radio value="a">显示</Radio>
              <Radio value="b">隐藏</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="input-number" label="即将售罄">
            <InputNumber min={1} max={10} />
          </Form.Item>
          <Form.Item name="checkbox-group" label="买家秀">
            <Checkbox.Group>
              <Row>
                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                  官方素材
                </Checkbox>
                <Checkbox value="B" style={{ lineHeight: '32px' }}>
                  买家素材
                </Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Card>
      {/* 分享设置 */}
      <Card style={{ width: '100%' }} title="分享设置" bordered={false}>
        <Form name="validate_other" onFinish={onFinish} style={{ marginLeft: 50 }}>
          <Form.Item name="switch" label="等级价格" valuePropName="checked">
            未启用 <Switch /> 已启用
          </Form.Item>
          <Form.Item name="radio-group" label="分享人头像昵称">
            <Radio.Group>
              <Radio value="a">显示</Radio>
              <Radio value="b">不显示</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>
      {/* 其他设置 */}
      <Card style={{ width: '100%' }} title="其他设置" bordered={false}>
        <Form name="validate_other" onFinish={onFinish} style={{ marginLeft: 50 }}>
          <Form.Item name="radio-group" label="购买跳转">
            <Radio.Group>
              <Radio value="a">开启</Radio>
              <Radio value="b">关闭</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="radio-group" label="商品分组">
            <Radio.Group>
              <Radio value="a">是</Radio>
              <Radio value="b">否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="radio-group" label="销售商设置">
            <Radio.Group>
              <Radio value="a">是</Radio>
              <Radio value="b">否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="radio-group" label="商品编码">
            <Radio.Group>
              <Radio value="a">是</Radio>
              <Radio value="b">否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="radio-group" label="支持换货">
            <Radio.Group>
              <Radio value="a">是</Radio>
              <Radio value="b">否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="radio-group" label="支持补发">
            <Radio.Group>
              <Radio value="a">是</Radio>
              <Radio value="b">否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>
      <ButtonGroupPro
        className="buttonGroupPro"
        button={[
          {
            label: '取消',
            // onClick: () => handle('add'),
          },
          {
            label: '保存',
            // onClick: () => handle('add'),
          },
        ]}
      />
    </>
  );
};
export default BasicInfo;
