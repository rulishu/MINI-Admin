import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

export default ({ headUrl, name, phone }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {headUrl ? (
        <Avatar src={headUrl} size="default" />
      ) : (
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      )}
      <div style={{ textAlign: 'left', marginLeft: 8 }}>
        <div style={{ fontSize: '16px' }}>{name || '-'}</div>
        <div style={{ fontSize: '14px' }}>{phone || '-'}</div>
      </div>
    </div>
  );
};
