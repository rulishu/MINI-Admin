import { Button, Card, Form, Input, Select, Space, Typography } from 'antd';
import { useState } from 'react';
const FormItem = Form.Item;

const options = [
  { value: 1, label: '酒精度' },
  { value: 2, label: '容量' },
];

export default ({
  value = [
    {
      attribute_name: 1,
      valueList: ['52', '42'],
    },
    {
      attribute_name: 2,
      valueList: ['52', '42'],
    },
  ],
  onChange,
}) => {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const [data, setData] = useState(value);

  console.log('data', data);

  const handleAddData = () => {
    const newData = [...data, { attribute_name: '', valueList: [] }];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  // 规格名变化
  const handleAttributeNameChange = (value, index) => {
    const newData = [...data];
    newData[index].attribute_name = value;
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  // 规格值变化
  const handleValueChange = (value, attrIndex, valueIndex) => {
    const newData = [...data];
    newData[attrIndex].valueList[valueIndex] = value;
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleAddValue = (attrIndex) => {
    const newData = [...data];
    newData[attrIndex].valueList.push('');
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  // 添加规格
  const renderProps = (item, attrIndex) => {
    return (
      <div key={attrIndex}>
        <div>
          <Form.Item label="规格名">
            <Select
              value={item.attribute_name}
              style={{ width: 160 }}
              onChange={(value) => handleAttributeNameChange(value, attrIndex)}
            >
              {options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item label="规格值">
          <Space>
            {(item.valueList || []).map((input, valueIndex) => (
              <Form.Item key={valueIndex} noStyle>
                <Input
                  value={input}
                  style={{ width: 160 }}
                  onChange={(e) => handleValueChange(e.target.value, attrIndex, valueIndex)}
                />
              </Form.Item>
            ))}
            <Typography.Link onClick={() => handleAddValue(attrIndex)}>添加规格值</Typography.Link>
          </Space>
        </Form.Item>
      </div>
    );
  };

  return (
    <Card>
      <Form>
        <FormItem {...formItemLayout}>
          {data.map((item, attrIndex) => renderProps(item, attrIndex))}
          <Button onClick={handleAddData} style={{ margin: '10px 0' }}>
            添加规格项目
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};
