import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

export default () => {
  // const [fileList, setFileList] = useState([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-2',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-3',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-4',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  // ]);

  const handleChange = async ({ file }) => {
    const data = new FormData();
    data.append('file', file);
    // 发送 fetch 请求
    const response = await fetch('/jcgl-user/oss/upload', {
      method: 'POST',
      body: data,
    });

    // 处理响应数据
    if (response.status !== 200) {
      // 失败情况处理
      console.error('Upload failed with status ' + response.status);
    } else {
      // 成功情况处理
      const responseData = await response.json();
      console.log('Upload succeeded with response', responseData);
    }
  };

  const uplpodProps = {
    headers: {},
    // fileList: fileList,
    customRequest: handleChange,
  };

  return (
    <Upload {...uplpodProps}>
      <Button icon={<UploadOutlined />}>上传</Button>
    </Upload>
  );
};
