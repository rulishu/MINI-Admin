import TheUpload from '@/components/Upload';
import { useDispatch } from '@umijs/max';
import { AutoComplete, Button, Card, Form, Input, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';

const SKU = ({ attrValue = [], onChange, options = [], form }) => {
  const dispatch = useDispatch();
  const [option, setOption] = useState(options);
  const [formData, setData] = useState(attrValue);

  // const [form] = Form.useForm();

  useEffect(() => {
    setOption(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.length]);

  useEffect(() => {
    if (attrValue.length > 0) {
      setData(attrValue);
      // handlerOption(attrValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // // 处理下拉框数据，删除已选数据
  // const handlerOption = (data) => {
  //   const arr = [];
  //   if (data?.length > 1) {
  //     options.forEach((item) => {
  //       if (data.findIndex((i) => String(i?.attribute_name) === item?.label) === -1) {
  //         console.log('item: ', item);
  //         arr.push(item);
  //       }
  //     });

  //     setOption(arr);
  //   } else {
  //     setOption(options);
  //   }
  // };

  const handleAddData = () => {
    const newData = [...formData, { attribute_name: '', valueList: [] }].concat([]);
    setData(newData);
    // handlerOption(newData);
  };

  const handleRemoveData = (index) => {
    const newData = [...formData].concat([]);
    newData.splice(index, 1);
    setData(newData);
    // handlerOption(newData);
    onChange(newData);
    form?.validateFields();
  };

  // 规格名变化
  const handleAttributeNameChange = (value, attrIndex) => {
    const newData = [...formData].concat([]);
    const att = options.find((option) => option.value === value);
    newData[attrIndex].attribute_name = att.label;
    newData[attrIndex].attribute_value = att.value;
    setData(newData);
    // handlerOption(newData);
    // onChange(newData);
  };

  // 规格值变化
  const handleValueChange = (value, attrIndex, valueIndex) => {
    const newData = [...formData].concat([]);
    newData[attrIndex].valueList[valueIndex]['value'] = value;
    setData(newData);
    // onChange(newData);
  };
  // 添加规格值
  const handleAddValue = (attrIndex) => {
    const newData = [...formData].concat([]);
    newData[attrIndex].valueList.push({ id: Date.now(), value: '' });
    setData(newData);
  };
  // 删除规格值
  const handleRemoveValue = (attrIndex, valueIndex) => {
    const newData = [...formData].concat([]);
    newData[attrIndex].valueList.splice(valueIndex, 1);
    setData(newData);
    onChange(newData);
    form?.validateFields();
  };

  const attributeNameInputStatus = (item) => {
    const result = formData.filter((i) => i?.attribute_name === item?.attribute_name);
    if (!item?.attribute_name) {
      return {
        validateStatus: 'error',
        help: '规格名不能为空',
      };
    }
    //  else if (!item?.attribute_value) {
    //   return {
    //     validateStatus: 'error',
    //     help: '规格ID不存在',
    //   };
    // }
    else if (result.length > 1) {
      return {
        validateStatus: 'error',
        help: '规格名不能重复',
      };
    } else {
      return {
        validateStatus: 'success',
      };
    }
  };
  // 添加规格
  const renderProps = (item, attrIndex) => {
    return (
      <Card key={'sku' + attrIndex}>
        <Form.Item
          key={'sku' + attrIndex}
          label="规格名"
          name={'sku' + attrIndex}
          // required={false}
          validateStatus={attributeNameInputStatus(item)?.validateStatus}
          help={attributeNameInputStatus(item)?.help}
          // rules={[
          //   // { required: true },
          //   {
          //     validator: () => {
          //       const result = formData.filter((i) => i?.attribute_name === item?.attribute_name);
          //       if (result.length < 2) {
          //         return Promise.resolve();
          //       }
          //       return Promise.reject(new Error('规格名不能重复'));
          //     },
          //   },
          // ]}
        >
          <Row justify="space-between">
            <AutoComplete
              value={item?.attribute_name}
              options={option}
              style={{
                width: 160,
              }}
              filterOption={(inputValue, option) =>
                option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              onChange={() => {}}
              onSearch={(name) => {
                const newData = [...formData].concat([]);
                newData[attrIndex].attribute_name = name;
                // newData[attrIndex].attribute_value = att.value;
                setData(newData);
              }}
              onSelect={(val) => handleAttributeNameChange(val, attrIndex)}
              onBlur={(e) => {
                console.log('onBlure: ', e);
                if (
                  e.target.value &&
                  attributeNameInputStatus(item)?.validateStatus === 'success'
                ) {
                  const dataIndex = options.findIndex((item) => item?.label === e.target.value);
                  // 输入的内容在列表中存在
                  if (dataIndex > -1) {
                    const obj = options[dataIndex];
                    if (obj?.label && obj?.value) {
                      const newData = [...formData].concat([]);
                      newData[attrIndex].attribute_value = obj?.value;
                      setData(newData);
                      onChange(newData);
                    }
                  } else {
                    // form
                    //   ?.validateFields()
                    //   .then(() => {})
                    //   .catch((errorInfo) => {
                    //     console.log('errorInfo: ', errorInfo);
                    //   });
                    dispatch({
                      type: 'productManage/insertAttribute',
                      payload: {
                        attributeName: e.target.value,
                        callback: (result) => {
                          const newData = [...formData].concat([]);
                          newData[attrIndex].attribute_value = result;
                          setData(newData);
                          onChange(newData);
                          dispatch({
                            type: 'productManage/selectAttr',
                          });
                        },
                      },
                    });
                  }
                }
              }}
              placeholder="请添加规格名"
            />
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
              <Space
                key={input?.id.toString()}
                direction="vertical"
                size="small"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Form.Item
                  key={input?.id.toString()}
                  name={`${input?.id}`}
                  // noStyle
                  required={false}
                  rules={[
                    // { required: true },
                    {
                      validator: () => {
                        // const arr =
                        //   formData.find(
                        //     (nameObj) => nameObj?.attribute_name === item?.attribute_name,
                        //   )?.valueList || [];
                        const arr = formData?.[attrIndex]?.valueList || [];
                        const result = arr.filter((i) => i?.value === input?.value);
                        if (result.length < 2) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('规格值不能重复'));
                      },
                    },
                  ]}
                >
                  <Space>
                    <Input
                      disabled={item?.attribute_name ? false : true}
                      value={input?.value}
                      style={{ width: 160 }}
                      onChange={(e) => handleValueChange(e.target.value, attrIndex, valueIndex)}
                      onBlur={(e) => {
                        if (e.target.value) {
                          onChange(formData);
                        } else {
                          handleRemoveValue(attrIndex, valueIndex);
                        }
                      }}
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
                  </Space>
                </Form.Item>

                {attrIndex === 0 && (
                  <TheUpload
                    value={
                      input?.imageUrl
                        ? [
                            {
                              name: input?.value,
                              url: input?.imageUrl,
                            },
                          ]
                        : []
                    }
                    onChange={(fileList) => {
                      const newData = [...formData].concat([]);
                      newData[attrIndex].valueList[valueIndex]['imageUrl'] = fileList?.[0]?.url;
                      setData(newData);
                    }}
                  />
                )}
              </Space>
            ))}
            {item.valueList.length < 10 && (
              <Typography.Link
                disabled={
                  attributeNameInputStatus(item)?.validateStatus !== 'success' ||
                  !item?.attribute_value ||
                  !item?.attribute_name ||
                  (item.valueList.length > 0
                    ? !item?.valueList?.[item.valueList.length - 1]?.value
                    : false)
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
            formData.length === 3
            // options.length > 2
            //   ? formData.length === 3
            //   : options.length === formData.length
            //   ? true
            //   : false
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
