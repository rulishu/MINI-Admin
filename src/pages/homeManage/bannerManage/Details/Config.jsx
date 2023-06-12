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

  useEffect(() => {
    if (visible) {
      form.setValues({
        form1: {
          name: queryInfo.name,
          jumpPath: queryInfo.jumpPath,
          path: (queryInfo.path && getUrlToList(queryInfo.path)) || [],
          linkMenuTag: enums.banner_tager_type.find(
            (item) => item?.dictLabel === queryInfo?.linkMenuTag,
          )?.dictValue,
          showStartTime: queryInfo.showStartTime && [
            queryInfo.showStartTime,
            queryInfo.showEndTime,
          ],
          sort: queryInfo.sort,
          category: queryInfo.category,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onFinish = (values) => {
    const { form1 } = values;
    const params = {
      name: form1.name,
      jumpPath: form1.jumpPath,
      path: (form1.path && getUrl(form1.path)) || '',
      linkMenuTag: enums.banner_tager_type.find((item) => item?.dictValue === form1?.linkMenuTag)
        ?.dictLabel,
      showStartTime: form1.showStartTime && form1.showStartTime[0] && form1.showStartTime[0],
      showEndTime: form1.showStartTime && form1.showStartTime[1] && form1.showStartTime[1],
      category: form1.category,
      sort: form1.sort,
      id: queryInfo.id,
      type: queryInfo.type,
    };
    mutateAsync(params);
  };

  const watch = {
    'form1.linkMenuTag': (val) => {
      form.setValues({
        form1: {
          jumpPath: val,
        },
      });
    },
    // 'form1.jumpPath': () => {
    //   form.setValues({
    //     form1: {
    //       linkMenuTag: '',
    //     },
    //   });
    // },
  };

  return (
    <AModal
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
      <ProCard>
        <FormRender
          watch={watch}
          form={form}
          schema={basicSchema({
            queryInfo,
            options:
              (enums.banner_tager_type &&
                enums.banner_tager_type.map((item) => ({
                  label: item.dictLabel,
                  value: item.dictValue,
                }))) ||
              [],
          })}
          widgets={{
            upload: Upload,
          }}
          onFinish={onFinish}
        />
      </ProCard>
    </AModal>
  );
};
