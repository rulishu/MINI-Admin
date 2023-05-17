import { useReactMutation } from '@antdp/hooks';
import { Avatar, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
const { Option } = Select;

export default ({ type, value = '', onChange, ...others }) => {
  const [defaultValue, setDefaultValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (type === 'edit' && value) {
      mutateAsync({ id: value });
      setDefaultValue(value);
    }
    if (type === 'add') {
      mutateAsync({});
      setDefaultValue('');
    }
  }, [type, value]);

  const { mutateAsync } = useReactMutation({
    url: '/jcgl-user/admin/user/select/page/list?pageNum=1&pageSize=20',
    onSuccess: ({ code, result }) => {
      if (code === 200) {
        setOptions(result.records);
      }
    },
  });

  const selectProps = {
    value: defaultValue,
    onFocus: () => mutateAsync({}),
    onSearch: (value) => mutateAsync({ userName: value }),
    onSelect: (value) => {
      setDefaultValue(value);
      onChange?.(value);
    },
    filterOption: false,
    showSearch: true,
    allowClear: true,
    ...others,
  };

  return (
    <Select style={{ width: '100%' }} {...selectProps}>
      {options.map((item) => (
        <Option value={item.userId} label={item.userName} key={item.userId}>
          <Space>
            <Avatar src={item.headUrl} size="small" />
            {`${item.userName}-${item.mobile}`}
          </Space>
        </Option>
      ))}
    </Select>
  );
};
