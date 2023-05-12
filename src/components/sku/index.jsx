import { Button, Card, Form, Input, Select, Space, Typography } from 'antd';
import { useState } from 'react';
import styles from './index.less';
const FormItem = Form.Item;

export default ({ onChange, options }) => {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const [data, setData] = useState([]);

  const handleAddData = () => {
    const newData = [...data, { attribute_name: '', valueList: [] }];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleRemoveData = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleAttributeNameChange = (value, attrIndex) => {
    const newData = [...data];
    const att = options.find((option) => option.value === value);
    newData[attrIndex].attribute_name = att.label;
    newData[attrIndex].attribute_value = att.value;
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

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

  const handleRemoveValue = (attrIndex, valueIndex) => {
    const newData = [...data];
    newData[attrIndex].valueList.splice(valueIndex, 1);
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

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
            {attrIndex !== 0 && (
              <Button type="link" danger size="small" onClick={() => handleRemoveData(attrIndex)}>
                删除
              </Button>
            )}
          </Form.Item>
        </div>
        <Form.Item label="规格值" className={styles.box}>
          <Space>
            {(item.valueList || []).map((input, valueIndex) => (
              <Form.Item key={valueIndex} noStyle>
                <Input
                  value={input}
                  style={{ width: 160 }}
                  onChange={(e) => handleValueChange(e.target.value, attrIndex, valueIndex)}
                />
                {valueIndex !== 0 && (
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() => handleRemoveValue(attrIndex, valueIndex)}
                  >
                    删除
                  </Button>
                )}
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
