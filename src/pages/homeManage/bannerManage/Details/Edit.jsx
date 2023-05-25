import AModal from '@/components/AModal';
import Upload from '@/components/upload';
import { create, updateInfo } from '@/service/homeManage/bannerManage';
import { getUrl, getUrlToList } from '@/utils';
import { ProCard } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';

export default () => {
  const form = useForm();
  const { visible, queryInfo, type } = useSelector((state) => state.bannerManage);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'bannerManage/update',
      payload: data,
    });
  };
  const fn = {
    add: create,
    edit: updateInfo,
  };
  const { mutateAsync, isLoading } = useReactMutation({
    mutationFn: fn[type],
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          visible: false,
          reload: true,
          type: '',
          queryInfo: {},
          relaod: true,
        });
      }
    },
  });

  useEffect(() => {
    if (visible) {
      form.setValues({
        jumpPath: queryInfo.jumpPath,
        sort: queryInfo.sort,
        category: queryInfo.category,
        type: queryInfo.type,
        path: queryInfo.path && getUrlToList(queryInfo.path),
      });
    }
  }, [visible, queryInfo]);

  const onFinish = (values) => {
    const params = {
      jumpPath: values.jumpPath,
      sort: values.sort,
      category: values.category,
      type: values.type,
      path: values.path && getUrl(values.path),
      id: queryInfo.id,
    };
    mutateAsync(params);
  };

  return (
    <AModal
      open={visible}
      onCancel={() => update({ visible: false })}
      width={600}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button key="save" type="primary" loading={isLoading} onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ visible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard
        title={type === 'add' ? '新增' : '修改'}
        headerBordered
        bodyStyle={{ paddingBottom: 0 }}
      >
        <FormRender
          form={form}
          schema={{
            type: 'object',
            column: 2,
            properties: {
              jumpPath: {
                title: '链接地址',
                type: 'string',
                required: true,
              },
              sort: {
                title: '排序',
                type: 'number',
                props: {
                  min: 0,
                  step: 1,
                },
                required: true,
              },
              category: {
                title: '类别',
                type: 'number',
                widget: 'select',
                props: {
                  options: [
                    { label: '小程序', value: 1 },
                    { label: 'app', value: 2 },
                  ],
                },
                required: true,
              },
              type: {
                title: '文件类型',
                type: 'number',
                widget: 'select',
                disabled: true,
                props: {
                  options: [
                    { label: '轮播图', value: 1 },
                    { label: '活动图', value: 2 },
                  ],
                },
                required: true,
              },
              path: {
                span: 24,
                title: '图片',
                type: 'array',
                widget: 'upload',
                props: {
                  listType: 'text',
                  accept: '.jpg,.png,.jpeg',
                },
                required: true,
              },
            },
          }}
          widgets={{
            upload: Upload,
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
