import { CloseOutlined, DownloadOutlined, RedoOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useState } from 'react';

export default ({ previewUrl = '', handleDownload, handleClosePreview, isVideo }) => {
  const [rotateDegree, setRotateDegree] = useState(0);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,.9)',
        display: previewUrl ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2023,
      }}
      onClick={() => handleClosePreview()}
    >
      {isVideo ? (
        <video
          src={previewUrl}
          controls // 显示控制条
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
      ) : (
        <img
          src={previewUrl}
          alt="预览"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transform: `rotate(${rotateDegree}deg)`,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      )}
      {previewUrl && (
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Space size="large">
            <RedoOutlined
              onClick={(e) => {
                e.stopPropagation();
                setRotateDegree((rotateDegree - 90) % 360);
              }}
              style={{ color: '#fff', fontSize: 20 }}
            />
            <DownloadOutlined
              onClick={(e) => handleDownload(e, previewUrl)}
              style={{ color: '#fff', fontSize: 20 }}
            />
            <CloseOutlined
              onClick={() => handleClosePreview()}
              style={{ color: '#fff', fontSize: 20 }}
            />
          </Space>
        </div>
      )}
    </div>
  );
};
