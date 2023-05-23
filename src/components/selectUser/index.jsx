import { UserOutlined } from '@ant-design/icons';
import { useReactMutation } from '@antdp/hooks';
import { Avatar, Modal, Select, Space } from 'antd';
import { Fragment, useState } from 'react';
const { Option } = Select;

export default ({
  value = undefined,
  onChange,
  api = '',
  configCode = {
    key: 'userId',
    value: 'userId',
    label: 'userName',
    headUrl: 'headUrl',
    phone: 'consumerPhone',
  },
  ...others
}) => {
  const [visible, setVisible] = useState(false);
  const [defaultValue, setDefaultValue] = useState(value);
  const [options, setOptions] = useState([]);
  const { mutateAsync } = useReactMutation({
    url: api,
    onSuccess: ({ code, result }) => {
      if (code === 200) {
        setOptions(result);
      }
    },
  });

  const selectProps = {
    value: defaultValue,
    onFocus: () => mutateAsync({}),
    onSearch: (value) => mutateAsync({ userName: value }),
    onSelect: (value, option) => {
      // 取出 label 和 value 组成 SelectValue 对象
      const { label, value: val, phone, headUrl } = option;
      setDefaultValue({
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {value ? (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 5,
            }}
          >
            {value.headUrl ? (
              <Avatar src={value.headUrl} size="small" />
            ) : (
              <Avatar
                size="small"
                style={{
                  backgroundColor: '#87d068',
                }}
                icon={<UserOutlined />}
              />
            )}
            {`${value.label}-${value.phone}`}
          </span>
        ) : (
          '未绑定'
        )}
        <a style={{ marginLeft: 5 }} onClick={() => setVisible(true)}>
          {value ? '修改' : '绑定'}
        </a>
      </div>
      <Modal
        forceRender
        title="绑定推荐人"
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          onChange?.(defaultValue);
          setVisible(false);
        }}
        width={400}
      >
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
                {`${item[configCode['label']]}-${item[configCode['phone']]}`}
              </Space>
            </Option>
          ))}
        </Select>
      </Modal>
    </Fragment>
  );
};
