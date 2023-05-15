import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import request from '@antdp/request';
import { Button, Upload, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getDefaultValue } from './utils';

export default ({
  value = [],
  onChange,
  listType = 'text',
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

  const handleChange = async ({ file }) => {
    const data = new FormData();
    data.append('file', file);
    // 发送 fetch 请求
    const { code, result } = await request('/jcgl-user/oss/upload', {
      method: 'POST',
      body: data,
    });
    if (code === 200) {
      const newFile = {
        url: `http://${result}`,
        name: file.name,
        uid: file.uid,
      };
      setFileList((prevList) => [...prevList, newFile]);
      // 失败情况处理
    } else {
      message.warning('上传失败');
    }
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.url !== file.url);
    setFileList(newFileList);
  };

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

  return <Upload {...uplpodProps}>{renderButton()}</Upload>;
};
