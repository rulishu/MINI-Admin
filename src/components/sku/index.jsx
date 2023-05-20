import { Button, Card, Form, Input, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
const FormItem = Form.Item;

const SKU = ({ attrValue = [], onChange, options = [] }) => {
  const [option, setOption] = useState(options);
  const [formData, setData] = useState(attrValue);
  const [form] = Form.useForm();

  useEffect(() => {
    if (attrValue.length > 0) {
      setData(attrValue);
      handlerOption(attrValue);
    }
  }, []);

  const handlerOption = (data) => {
    const arr = [];
    if (data?.length > 1) {
      options.forEach((item) => {
        if (data.findIndex((i) => String(i?.attribute_value) === item?.value) === -1) {
          arr.push(item);
        }
      });

      setOption(arr);
    } else {
      setOption(options);
    }
  };

  const handleAddData = () => {
    const newData = [...formData, { attribute_name: '', valueList: [] }];
    setData(newData);
    handlerOption(newData);
  };

  const handleRemoveData = (index) => {
    const newData = [...formData];
    newData.splice(index, 1);
    setData(newData);
    handlerOption(newData);
  };

  // 规格名变化
  const handleAttributeNameChange = (value, attrIndex) => {
    const newData = [...formData];
    const att = options.find((option) => option.value === value);
    newData[attrIndex].attribute_name = att.label;
    newData[attrIndex].attribute_value = att.value;
    setData(newData);
    handlerOption(newData);
  };

  // 规格值变化
  const handleValueChange = (value, attrIndex, valueIndex) => {
    const newData = [...formData];
    newData[attrIndex].valueList[valueIndex] = value;
    setData(newData);
  };

  const handleAddValue = (attrIndex) => {
    const newData = [...formData];
    newData[attrIndex].valueList.push('');
    setData(newData);
  };

  const handleRemoveValue = (attrIndex, valueIndex) => {
    const newData = [...formData];
    newData[attrIndex].valueList.splice(valueIndex, 1);
    setData(newData);
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
              {option.map((option) => (
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
        <Form.Item label="规格值">
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
  const addTableList = () => {
    onChange(formData);
  };
  return (
    <Card>
      <Form form={form} initialValues={attrValue}>
        <FormItem {...formItemLayout}>
          {formData.map((item, attrIndex) => renderProps(item, attrIndex))}
          <Button
            onClick={handleAddData}
            disabled={options.length === formData.length ? true : false}
            type="primary"
            style={{ margin: '10px 0', width: 120 }}
          >
            添加规格项目
          </Button>
          {formData.length > 0 && (
            <Button
              onClick={addTableList}
              type="primary"
              style={{ margin: '10px 20px', width: attrValue.length > 0 ? 140 : 120 }}
            >
              {attrValue.length > 0 ? '重新生成规格列表' : '生成规格列表'}
            </Button>
          )}
        </FormItem>
      </Form>
    </Card>
  );
};

export default SKU;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
