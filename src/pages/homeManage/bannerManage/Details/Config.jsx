import AModal from '@/components/AModal';
import Upload from '@/components/Upload';
import { create, updateInfo } from '@/service/homeManage/bannerManage';
import { getUrl, getUrlToList } from '@/utils';
import { ProCard } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import { useEffect } from 'react';
import { basicSchema } from './schema';

export default () => {
  const dispatch = useDispatch();
  const {
    bannerManage: { queryInfo, type, visible },
    commonInterface: { enums = {} },
  } = useSelector((state) => state);
  const form = useForm();
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
          type: '',
          queryInfo: {},
          reload: true,
        });
      }
    },
  });

  const emumsOptions =
    queryInfo.category === 1 ? enums.banner_tager_type : enums.app_banner_tager_type;

  useEffect(() => {
    if (visible) {
      form.setValues({
        name: queryInfo.name,
        jumpPath: queryInfo.jumpPath,
        path: queryInfo?.path ? getUrlToList(queryInfo.path) : [],
        linkMenuTag: (emumsOptions || []).find((item) => item?.dictLabel === queryInfo?.linkMenuTag)
          ?.dictValue,
        showStartTime: queryInfo.showStartTime && [queryInfo.showStartTime, queryInfo.showEndTime],
        sort: queryInfo.sort,
        category: queryInfo.category,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onFinish = (values) => {
    const params = {
      name: values.name,
      jumpPath: values.jumpPath,
      path: (values.path && getUrl(values.path)) || '',
      linkMenuTag: emumsOptions.find((item) => item?.dictValue === values?.linkMenuTag)?.dictLabel,
      showStartTime: values.showStartTime && values.showStartTime[0] && values.showStartTime[0],
      showEndTime: values.showStartTime && values.showStartTime[1] && values.showStartTime[1],
      category: values.category,
      sort: values.sort,
      id: queryInfo.id,
      type: queryInfo.type,
    };
    mutateAsync(params);
  };

  const watch = {
    linkMenuTag: (val) => {
      form.setValues({
        jumpPath: val,
      });
    },
    category: (val) => {
      form.setValues({
        linkMenuTag: '',
        jumpPath: '',
      });
      update({ queryInfo: { ...queryInfo, category: val } });
    },
  };

  return (
    <AModal
      destroyOnClose={true}
      open={visible}
      width={700}
      onCancel={() => update({ visible: false })}
      footer={
        <div style={{ paddingBottom: 24, paddingRight: 24 }}>
          <Button loading={isLoading} key="save" type="primary" onClick={form.submit}>
            保存
          </Button>
          <Button key="cancel" onClick={() => update({ visible: false })}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard
        title={queryInfo.type === 1 ? '首页Banner' : '首页活动'}
        headerBordered
        bodyStyle={{ paddingBottom: 0 }}
      >
        <FormRender
          form={form}
          watch={watch}
          schema={basicSchema({
            queryInfo,
            options: (emumsOptions || []).map((item) => ({
              label: item.dictLabel,
              value: item.dictValue,
            })),
          })}
          widgets={{
            comupload: Upload,
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
