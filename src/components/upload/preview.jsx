import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

export default ({ previewUrl = '', handleDownload, handleClosePreview }) => {
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
          setRotateDegree((rotateDegree - 90) % 360); // 顺时针旋转90度
        }}
      />
      {previewUrl && (
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Button icon={<DownloadOutlined />} onClick={(e) => handleDownload(e, previewUrl)} />
        </div>
      )}
    </div>
  );
};
