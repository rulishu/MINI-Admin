import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { request } from '@umijs/max';
import { Button, Upload, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    onChange?.(fileList);
  }, [fileList]);

  const handleChange = async ({ file, onSuccess, onProgress }) => {
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

  // const handlePreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };

  const uplpodProps = {
    fileList: fileList,
    customRequest: handleChange,
    onRemove: handleRemove,
    listType: listType,
    maxCount: 1,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
      showDownloadIcon: true,
      ...showUploadList,
    },
    // onPreview: handlePreview,
    ...others,
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

  return (
    <>
      <Upload {...uplpodProps}>{renderButton()}</Upload>
    </>
  );
};
