import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { request } from '@umijs/max';
import { Button, Upload, message } from 'antd';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { getDefaultValue } from './utils';

export default ({
  value = [],
  onChange,
  listType = 'picture-card',
  showUploadList,
  maxCount = 1,
  ...others
}) => {
  const defaultValue = useMemo(() => {
    return getDefaultValue(value);
  }, [value]);

  const [fileList, setFileList] = useState(defaultValue);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [rotateDegree, setRotateDegree] = useState(0);

  useEffect(() => {
    onChange?.(fileList);
  }, [fileList]);

  const customRequest = async ({ file, onSuccess, onProgress }) => {
    const token = sessionStorage.getItem('token');
    const data = new FormData();
    // 将文件添加到 FormData 中
    data.append('file', file);
    // 发送 fetch 请求
    try {
      const response = await request('/jcgl-user/oss/upload', {
        method: 'POST',
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: ({ loaded, total }) => {
          onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
        },
      });
      if (response.code === 200) {
        const newFile = {
          url: `http://${response.result}`,
          name: file.name,
          uid: file.uid,
          status: 'success',
        };
        setFileList((prevList) => [...prevList, newFile]);
        onSuccess?.(response, file);
        // 失败情况处理
      } else {
        message.warning('上传失败');
      }
    } catch (error) {
      message.warning('上传失败');
    }
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.url !== file.url);
    setFileList(newFileList);
  };

  // 预览
  const handlePreview = async (file) => {
    let src = file.url || '';
    // 如果url中最后.jpg不是图片类型直接下载
    const suffix = src.substring(src.lastIndexOf('.') + 1); // 获取文件后缀名
    if (!suffix.match(/(png|jpeg|jpg|gif)$/i)) {
      // 如果不是图片类型
      handleDownload(src); // 直接下载该文件
      return;
    }
    setPreviewUrl(src);
    setPreviewVisible(true);
  };

  // 下载
  const handleDownload = (e, url) => {
    e.stopPropagation(); // 阻止事件冒泡
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const renderButton = () => {
    if (listType === 'text' && fileList.length < maxCount) {
      return <Button icon={<UploadOutlined />}>上传</Button>;
    }
    if (
      (listType === 'picture-card' || listType === 'picture-circle') &&
      fileList.length < maxCount
    ) {
      return (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>上传</div>
        </div>
      );
    }
  };

  const uplpodProps = {
    fileList: fileList,
    customRequest: customRequest,
    onRemove: handleRemove,
    listType: listType,
    maxCount: 1,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
      showDownloadIcon: true,
      ...showUploadList,
    },
    onPreview: handlePreview,
    ...others,
  };

  return (
    <Fragment>
      <Upload {...uplpodProps}>{renderButton()}</Upload>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,.9)',
          display: previewVisible ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2023,
        }}
        onClick={() => setPreviewVisible(false)}
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
        {previewVisible && (
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <Button icon={<DownloadOutlined />} onClick={(e) => handleDownload(e, previewUrl)} />
          </div>
        )}
      </div>
    </Fragment>
  );
};
