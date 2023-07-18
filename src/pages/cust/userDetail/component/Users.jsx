import { UserOutlined } from '@ant-design/icons';
import { useReactMutation } from '@antdp/hooks';
import { Avatar, Select, Space } from 'antd';
import { Fragment, useState } from 'react';
const { Option } = Select;

export default ({
  fetch,
  value = undefined,
  onChange,
  configCode = {
    key: 'id',
    value: 'id',
    label: 'consumerName',
    headUrl: 'headUrl',
    phone: 'consumerPhone',
    searchCode: 'search',
  },
  ...others
}) => {
  const [defaultValue, setDefaultValue] = useState(value);
  const [options, setOptions] = useState([]);
  const { mutateAsync } = useReactMutation({
    mutationFn: fetch,
    contentType: 'form',
    onSuccess: ({ code, result }) => {
      if (code === 200) {
        setOptions(result);
      }
    },
  });

  const selectProps = {
    value: defaultValue,
    onFocus: () => mutateAsync({ [configCode['searchCode']]: '' }),
    onSearch: (value) => mutateAsync({ [configCode['searchCode']]: value }),
    onSelect: (value, option) => {
      // 取出 label 和 value 组成 SelectValue 对象
      const { label, value: val, phone, headUrl } = option;
      setDefaultValue({
        label: label,
        value: val,
        phone: phone,
        headUrl: headUrl,
      });
      onChange?.({
        label: label,
        value: val,
        phone: phone,
        headUrl: headUrl,
      });
    },
    onClear: () => setDefaultValue(undefined),
    filterOption: false,
    showSearch: true,
    allowClear: true,
    optionLabelProp: 'label',
    optionFilterProp: 'children',
    labelInValue: true,
    ...others,
  };

  return (
    <Fragment>
      <Select {...selectProps} style={{ width: '100%' }}>
        {options.map((item) => (
          <Option
            value={item[configCode['value']]}
            key={item[configCode['key']]}
            label={item[configCode['label']]}
            phone={item[configCode['phone']]}
            headUrl={item[configCode['headUrl']]}
          >
            <Space>
              {item[configCode['headUrl']] ? (
                <Avatar src={item[configCode['headUrl']]} size="small" />
              ) : (
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: '#87d068',
                  }}
                  icon={<UserOutlined />}
                />
              )}
              {`${item[configCode['label']]}-${item[configCode['value']]}-${
                item[configCode['phone']]
              }`}
            </Space>
          </Option>
        ))}
      </Select>
    </Fragment>
  );
};
