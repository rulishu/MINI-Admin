import { UserOutlined } from '@ant-design/icons';
import { useReactMutation } from '@antdp/hooks';
import { Avatar, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
const { Option } = Select;

export default ({ value = undefined, onChange, ...others }) => {
  const [defaultValue, setDefaultValue] = useState(undefined);
  const [options, setOptions] = useState([]);
  const { mutateAsync } = useReactMutation({
    url: '/jcgl-user/admin/user/select/list',
    onSuccess: ({ code, result }) => {
      if (code === 200) {
        setOptions(result);
      }
    },
  });

  useEffect(() => {
    setDefaultValue(value);
  }, [value]);

  const selectProps = {
    value: defaultValue,
    onFocus: () => mutateAsync({}),
    onSearch: (value) => mutateAsync({ userName: value }),
    onSelect: (value, option) => {
      // 取出 label 和 value 组成 SelectValue 对象
      const { label, value: val, phone } = option;
      setDefaultValue({ label, value: val, phone });
      onChange?.({ label, value: val, phone });
    },
    onClear: () => {
      setDefaultValue(undefined);
      onChange?.(undefined);
    },
    filterOption: false,
    showSearch: true,
    allowClear: true,
    optionLabelProp: 'label',
    optionFilterProp: 'children',
    labelInValue: true,
    ...others,
  };

  return (
    <Select {...selectProps} style={{ width: '100%' }}>
      {options.map((item) => (
        <Option
          value={item.userId}
          key={item.userId}
          label={item.userName}
          phone={item.consumerPhone}
        >
          <Space>
            {item?.headUrl ? (
              <Avatar src={item?.headUrl} size="small" />
            ) : (
              <Avatar
                size="small"
                style={{
                  backgroundColor: '#87d068',
                }}
                icon={<UserOutlined />}
              />
            )}
            {`${item.userName}-${item?.mobile}`}
          </Space>
        </Option>
      ))}
    </Select>
  );
};
