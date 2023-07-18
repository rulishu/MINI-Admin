import { useSelector } from '@umijs/max';
import { InputNumber, Radio, Select, Space } from 'antd';
import { useEffect, useState } from 'react';

const TeRadio = ({ onChange, value }) => {
  const { productManage } = useSelector((state) => state);
  const { templateIdList } = productManage;

  const [radioValue, setRadioValue] = useState(1);
  const [inputValue, setInputValue] = useState();
  const [selectValue, setSelectValue] = useState();

  useEffect(() => {
    if (value?.radioValue === 1) {
      setInputValue(value?.inputValue);
    }
    if (value?.radioValue === 2) {
      setSelectValue(value?.selectValue);
    }
    setRadioValue(value?.radioValue || 1);
  }, [value]);

  const radioChange = (e) => {
    console.log('radioChange: ', e.target.value);
    setRadioValue(e.target.value);
    if (e.target.value === 1) {
      onChange({ radioValue: e.target.value, inputValue });
    }
    if (e.target.value === 2) {
      onChange({ radioValue: e.target.value, selectValue });
    }
  };
  const inputChange = (val) => {
    console.log('inputChange: ', val);
    setInputValue(val);
    onChange({ radioValue, inputValue: val });
  };
  const selectChange = (val) => {
    console.log('selectChange: ', val);
    setSelectValue(val);
    onChange({ radioValue, selectValue: val });
  };

  return (
    <Radio.Group onChange={radioChange} value={radioValue}>
      <Space direction="vertical">
        <Radio value={1}>
          <Space>
            <div>固定运费</div>
            <InputNumber
              min={0}
              disabled={radioValue === 2}
              style={{
                width: 200,
              }}
              controls={false}
              precision={2}
              value={inputValue}
              onChange={inputChange}
            />
            <div>元</div>
          </Space>
        </Radio>
        <Radio value={2}>
          <Space>
            <div>运费模板</div>
            <Select
              disabled={radioValue === 1}
              labelInValue
              value={selectValue}
              style={{
                width: 200,
              }}
              popupMatchSelectWidth={500}
              onChange={selectChange}
              options={templateIdList.map((item) => ({
                label: item?.name,
                value: item?.id,
              }))}
            />
          </Space>
        </Radio>
      </Space>
    </Radio.Group>
  );
};

export default TeRadio;
