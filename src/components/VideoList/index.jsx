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

export default (value = []) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [visible, setVisible] = useState(false);
  return (
    <Fragment>
      <Space>
        {value.map((item, i) => (
          <a
            onClick={() => {
              setPreviewUrl(item);
              setVisible(true);
            }}
            key={i}
          >
            {getDefaultValue(item)}
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
          onClick={(e) => {
            e.stopPropagation();
            setVisible(false);
            setPreviewUrl('');
          }}
        >
          <video
            src={previewUrl}
            controls // 显示控制条
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
    </Fragment>
  );
};
