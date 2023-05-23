import TheUpload from '@/components/upload';
import { Button, Card, Form, Input, Row, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';

const SKU = ({ attrValue = [], onChange, options = [] }) => {
  const [option, setOption] = useState(options);
  const [formData, setData] = useState(attrValue);
  const [form] = Form.useForm();

  useEffect(() => {
    if (attrValue.length > 0) {
      setData(attrValue);
      handlerOption(attrValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    onChange(newData);
  };

  // 规格名变化
  const handleAttributeNameChange = (value, attrIndex) => {
    const newData = [...formData];
    const att = options.find((option) => option.value === value);
    newData[attrIndex].attribute_name = att.label;
    newData[attrIndex].attribute_value = att.value;
    setData(newData);
    handlerOption(newData);
    onChange(newData);
  };

  // 规格值变化
  const handleValueChange = (value, attrIndex, valueIndex) => {
    const newData = [...formData];
    newData[attrIndex].valueList[valueIndex]['value'] = value;
    setData(newData);
    onChange(newData);
  };
  // 添加规格值
  const handleAddValue = (attrIndex) => {
    const newData = [...formData];
    newData[attrIndex].valueList.push({ id: Date.now(), value: '' });
    setData(newData);
  };
  // 删除规格值
  const handleRemoveValue = (attrIndex, valueIndex) => {
    const newData = [...formData];
    newData[attrIndex].valueList.splice(valueIndex, 1);
    setData(newData);
    onChange(newData);
  };

  // 添加规格
  const renderProps = (item, attrIndex) => {
    console.log('item, attrIndex: ', item, attrIndex);
    return (
      <Card key={attrIndex}>
        <Form.Item label="规格名">
          <Row justify="space-between">
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
            {formData.length > 1 ? (
              <Button danger type="link" onClick={() => handleRemoveData(attrIndex)}>
                删除当前规格
              </Button>
            ) : (
              <div />
            )}
          </Row>
        </Form.Item>
        <Form.Item label="规格值" style={{ marginBottom: 0 }}>
          <Space align="baseline" wrap>
            {(item.valueList || []).map((input, valueIndex) => (
              <Form.Item key={input?.id.toString()} noStyle>
                <Space
                  direction="vertical"
                  size="small"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Input
                    disabled={item?.attribute_name ? false : true}
                    value={input?.value}
                    style={{ width: 160 }}
                    onChange={(e) => handleValueChange(e.target.value, attrIndex, valueIndex)}
                    suffix={
                      <Button
                        type="link"
                        danger
                        size="small"
                        onClick={() => handleRemoveValue(attrIndex, valueIndex)}
                        style={{ padding: 0 }}
                      >
                        删除
                      </Button>
                    }
                  />
                  {attrIndex === 0 && (
                    <TheUpload
                      onChange={(fileList) => {
                        console.log('fileList: ', fileList?.[0]?.url);
                        const newData = [...formData];
                        newData[attrIndex].valueList[valueIndex]['imageUrl'] = fileList?.[0]?.url;
                        setData(newData);
                      }}
                    />
                  )}
                </Space>
              </Form.Item>
            ))}
            {item.valueList.length < 10 && (
              <Typography.Link
                disabled={
                  item.valueList.length > 0
                    ? !item?.valueList?.[item.valueList.length - 1]?.value
                    : false
                }
                onClick={() => handleAddValue(attrIndex)}
              >
                添加规格值
              </Typography.Link>
            )}
          </Space>
        </Form.Item>
      </Card>
    );
  };

  return (
    <Form form={form} preserve={false} initialValues={attrValue}>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
        }}
      >
        {formData.map((item, attrIndex) => renderProps(item, attrIndex))}
        <Button
          onClick={handleAddData}
          disabled={
            options.length > 2
              ? formData.length === 3
              : options.length === formData.length
              ? true
              : false
          }
          type="primary"
          style={{ margin: '10px 0', width: 120 }}
        >
          添加规格项目
        </Button>
      </Space>
    </Form>
  );
};

export default SKU;
