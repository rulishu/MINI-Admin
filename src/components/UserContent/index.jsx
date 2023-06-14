import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
const { Text } = Typography;
export default ({ showHead = true, headUrl, name, phone, width }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {showHead &&
        (headUrl ? (
          <Avatar src={headUrl} size="default" />
        ) : (
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<UserOutlined />}
          />
        ))}
      <div style={{ textAlign: 'left', marginLeft: 8, width: width - 50 }}>
        <div>
          <Text ellipsis={{ tooltip: name }} style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {name || '-'}
          </Text>
        </div>
        <div>
          <Text ellipsis={{ tooltip: phone }} style={{ fontSize: '14px' }}>
            {phone || '-'}
          </Text>
        </div>
      </div>
    </div>
  );
};
