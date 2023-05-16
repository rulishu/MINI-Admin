import { CloseOutlined, DownloadOutlined, RedoOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useState } from 'react';

export default ({ previewUrl = '', handleDownload, handleClosePreview, isVideo }) => {
  const [rotateDegree, setRotateDegree] = useState(0);
  const [zoomFactor, setZoomFactor] = useState(1);
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
      onClick={(e) => handleClosePreview(e)}
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
            width: `${100 * zoomFactor}%`,
            height: `${100 * zoomFactor}%`,
          }}
          onWheel={(e) => {
            e.preventDefault();
            const deltaY = e.nativeEvent.deltaY;
            // 每次滚动增加 / 减少 0.1 的缩放比例
            setZoomFactor(Math.max(0.1, Math.min(zoomFactor + deltaY / 1000, 10)));
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
              onClick={(e) => handleClosePreview(e)}
              style={{ color: '#fff', fontSize: 20 }}
            />
          </Space>
        </div>
      )}
    </div>
  );
};
