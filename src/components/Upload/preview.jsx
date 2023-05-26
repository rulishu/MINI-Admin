import {
  CloseOutlined,
  DownloadOutlined,
  MinusOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
import { useState } from 'react';

export default ({ previewUrl = '', handleDownload, handleClosePreview, isVideo }) => {
  const [rotateDegree, setRotateDegree] = useState(0);
  const [zoomFactor, setZoomFactor] = useState(1);
  const handleZoomIn = () => {
    setZoomFactor(zoomFactor + 0.1);
  };

  const handleZoomOut = () => {
    setZoomFactor(zoomFactor - 0.1);
  };
  return (
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
        />
      )}
      {previewUrl && (
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Space size="large">
            <PlusOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              style={{ color: '#fff', fontSize: 20 }}
            />
            <MinusOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              style={{ color: '#fff', fontSize: 20 }}
            />
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
