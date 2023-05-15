import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import request from '@antdp/request';
import { Button, Upload, message } from 'antd';
import { useEffect, useState } from 'react';

export default ({ value = [], onChange, listType = 'text', showUploadList, ...others }) => {
  const [fileList, setFileList] = useState(value);

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
        url: result,
        name: file.name,
        uid: file.uid,
      };
      const newFileList = [...fileList, newFile];
      setFileList(newFileList);
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
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
      showDownloadIcon: true,
      ...showUploadList,
    },
    ...others,
  };

  return (
    <Upload {...uplpodProps}>
      {(listType === 'text' || listType === 'picture') && (
        <Button icon={<UploadOutlined />}>上传</Button>
      )}
      {(listType === 'picture-card' || listType === 'picture-circle') && (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};
