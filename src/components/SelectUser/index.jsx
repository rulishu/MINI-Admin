import { UserOutlined } from '@ant-design/icons';
import { useReactMutation } from '@antdp/hooks';
import { Avatar, Modal, Select, Space } from 'antd';
import { Fragment, useState } from 'react';
const { Option } = Select;

export default ({
  fetch,
  value = undefined,
  onChange,
  configCode = {
    key: 'consumerId',
    value: 'consumerId',
    label: 'consumerName',
    headUrl: 'headUrl',
    phone: 'consumerPhone',
    searchCode: 'consumerName',
  },
  title,
  ...others
}) => {
  const [visible, setVisible] = useState(false);
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
            {`${value.label}-${value.value}-${value.phone}`}
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
        title={title}
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
                {`${item[configCode['label']]}-${item[configCode['value']]}-${
                  item[configCode['phone']]
                }`}
              </Space>
            </Option>
          ))}
        </Select>
      </Modal>
    </Fragment>
  );
};
