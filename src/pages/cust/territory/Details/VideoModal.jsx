import AModal from '@/components/AModal';
import Upload from '@/components/Upload';
import { uploadVideos } from '@/service/cust/territory';
import { getUrl, getUrlToList } from '@/utils';
import { ProCard } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';

export default () => {
  const form = useForm();
  const {
    territory: { videoVisible, videoData },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'territory/update',
      payload: data,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: uploadVideos,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          videoVisible: false,
          videoData: {},
          reload: true,
          type: '',
        });
      }
    },
  });

  useEffect(() => {
    if (videoVisible) {
      // 获取areaId和他父级集合
      form.setValues({
        videos: getUrlToList(videoData.videos),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoVisible, videoData]);

  const onFinish = (values) => {
    const params = {
      videos: getUrl(values.videos),
      id: Number(videoData.id),
    };
    mutateAsync(params);
  };

  return (
    <AModal
      open={videoVisible}
      width={700}
      onCancel={() => update({ videoVisible: false })}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" type="primary" loading={isLoading} onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ videoVisible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard title="上传视频" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <FormRender
          form={form}
          widgets={{ upload: Upload }}
          schema={{
            type: 'object',
            column: 1,
            properties: {
              videos: {
                title: '视频',
                type: 'array',
                widget: 'upload',
                required: true,
                props: {
                  maxCount: 3,
                  listType: 'picture-card',
                  warn: '仅支持mp4格式上传，大小不超过100MB',
                  accept: '.mp4',
                  limitSize: 100,
                },
              },
            },
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
