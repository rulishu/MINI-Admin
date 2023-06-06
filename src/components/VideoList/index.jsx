import { CloseOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Fragment, useState } from 'react';

const getDefaultValue = (fileList = []) => {
  const newFileList = [...fileList];
  newFileList.forEach((item) => {
    if (!item.name) {
      const nameArr = item.url.split('/');
      const name = nameArr[nameArr.length - 1];
      item.name = name;
    }
  });
  return newFileList;
};

export default ({ value = [] }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [visible, setVisible] = useState(false);

  const closePreview = (e) => {
    e.stopPropagation();
    setVisible(false);
    setPreviewUrl('');
  };

  return (
    <Fragment>
      <Space direction="vertical" size="small">
        {getDefaultValue(value).map((item, i) => (
          <a
            onClick={() => {
              setPreviewUrl(item.url);
              setVisible(true);
            }}
            key={i}
          >
            {item.name}
          </a>
        ))}
      </Space>
      {visible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            display: previewUrl ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2023,
          }}
          onClick={(e) => closePreview(e)}
        >
          <video
            src={previewUrl}
            controls // 显示控制条
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <CloseOutlined
              onClick={(e) => closePreview(e)}
              style={{ color: '#fff', fontSize: 20 }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};
