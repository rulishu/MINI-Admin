import { Button, Card, Form, Input, Select, Space, Typography } from 'antd';
import { useState } from 'react';
import SKUList from './SKUList';
import styles from './index.less';
const FormItem = Form.Item;

const SKU = ({ attrValue = [], onChange, options, value = [] }) => {
  console.log('attrValue: ', attrValue);

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };

  const [formData, setData] = useState(attrValue);
  const [tableData, setTableData] = useState([]);
  console.log('formData', formData);
  const handleAddData = () => {
    const newData = [...formData, { attribute_name: '', valueList: [] }];
    setData(newData);
  };

  const handleRemoveData = (index) => {
    const newData = [...formData];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleAttributeNameChange = (value, attrIndex) => {
    const newData = [...formData];
    const att = options.find((option) => option.value === value);
    newData[attrIndex].attribute_name = att.label;
    newData[attrIndex].attribute_value = att.value;
    setData(newData);
  };

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
              <Form.Item key={input} noStyle>
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
    setTableData(formData);
  };

  return (
    <div>
      <Card>
        <Form>
          <FormItem {...formItemLayout}>
            {formData.map((item, attrIndex) => renderProps(item, attrIndex))}
            <Button onClick={handleAddData} type="primary" style={{ margin: '10px 0', width: 120 }}>
              添加规格项目
            </Button>
            {formData.length > 0 && (
              <Button
                onClick={addTableList}
                type="primary"
                style={{ margin: '10px 20px', width: 120 }}
              >
                生成规格列表
              </Button>
            )}
          </FormItem>
        </Form>
      </Card>
      <Card style={{ marginTop: 20 }}>
        <SKUList value={value} data={tableData} onChange={onChange} />
      </Card>
    </div>
  );
};

export default SKU;
