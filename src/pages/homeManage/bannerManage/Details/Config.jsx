import AModal from '@/components/AModal';
import Upload from '@/components/Upload';
import { create, updateInfo } from '@/service/homeManage/bannerManage';
import { getUrl, getUrlToList } from '@/utils';
import { ImportOutlined } from '@ant-design/icons';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Card, Empty, Image, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { basicItems, basicSchema } from './schema';

export default () => {
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const { queryInfo, type } = useSelector((state) => state.bannerManage);
  const form = useForm();
  const [hide, setHide] = useState(null); // 1.轮播图 2.活动图

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
    const { content = {} } = queryInfo;
    if (hide === 1) {
      const list = (content.bannerList || []).map((item) => ({
        ...item,
        path: getUrlToList(item.path),
      }));

      form.setValues({
        form1: {
          bannerList: list || [],
        },
      });
    }
    if (hide === 2) {
      const list = (content.activityList || []).map((item) => ({
        ...item,
        path: getUrlToList(item.path),
      }));
      form.setValues({
        form2: {
          activityList: list || [],
        },
      });
    }
  }, [hide]);

  const save = () => {
    if (!queryInfo.title) {
      message.warning('请填写页面名称');
      return;
    }
    if (!queryInfo.type) {
      message.warning('请选择页面类型');
      return;
    }
    const params = {
      title: queryInfo.title,
      content: JSON.stringify(queryInfo.content),
      id: queryInfo.id,
      type: queryInfo.type,
    };
    mutateAsync(params);
  };

  const onFinish = (values) => {
    const { form1, form2 } = values;
    if (form1) {
      const list = (form1.bannerList || []).map((item, idx) => ({
        ...item,
        path: getUrl(item.path),
        sort: idx + 1,
      }));
      update({
        queryInfo: {
          ...queryInfo,
          content: {
            ...queryInfo.content,
            bannerList: list,
          },
        },
      });
      setHide(null);
      message.success('轮播图配置成功');
    }
    if (form2) {
      const list = (form2.activityList || []).map((item, idx) => ({
        ...item,
        path: getUrl(item.path),
        sort: idx + 1,
      }));
      update({
        queryInfo: {
          ...queryInfo,
          content: {
            ...queryInfo.content,
            activityList: list,
          },
        },
      });
      setHide(null);
      message.success('活动图配置成功');
    }
  };

  const bannerPicList = useMemo(() => {
    const { content = {} } = queryInfo;
    if (content.bannerList && content.bannerList.length > 0) {
      return (
        <div style={{ display: 'flex', justifyItems: 'flex-start', alignItems: 'center' }}>
          {content.bannerList.map((item, i) => (
            <div key={i} style={{ marginRight: '10px' }}>
              <Image width={100} height={100} src={item.path} />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Empty description="暂无数据" />
      </div>
    );
  }, [queryInfo]);

  const activityicList = useMemo(() => {
    const { content = {} } = queryInfo;
    if (content.activityList && content.activityList.length > 0) {
      return (
        <div style={{ display: 'flex', justifyItems: 'flex-start', alignItems: 'center' }}>
          {content.activityList.map((item, i) => (
            <div key={i} style={{ marginRight: '10px' }}>
              <Image width={100} height={100} src={item.path} />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Empty description="暂无数据" />
      </div>
    );
  }, [queryInfo]);

  return (
    <Fragment>
      <Card
        bordered
        bodyStyle={{ backgroundColor: '#f7f7f7' }}
        extra={
          <Space>
            <Button loading={isLoading} type="primary" onClick={save}>
              立即发布
            </Button>
            <Button type="link" onClick={() => update({ visible: false })}>
              <ImportOutlined />
              退出
            </Button>
          </Space>
        }
      >
        <Card title="页面配置" bordered={false}>
          <ProDescriptions
            dataSource={queryInfo}
            columns={basicItems({ type })}
            editable={{
              onSave: async (_, values) => {
                update({
                  queryInfo: {
                    ...queryInfo,
                    ...values,
                  },
                });
                return true;
              },
            }}
          />
        </Card>
        <Card
          style={{ marginTop: 24 }}
          title="轮播图配置"
          bordered={false}
          extra={<a onClick={() => setHide(1)}>编辑</a>}
        >
          {bannerPicList}
        </Card>
        <Card
          title="活动图配置"
          bordered={false}
          style={{ marginTop: 24 }}
          extra={<a onClick={() => setHide(2)}>编辑</a>}
        >
          {activityicList}
        </Card>
      </Card>

      <AModal
        open={hide ? true : false}
        width={800}
        onCancel={() => setHide(null)}
        footer={
          <div style={{ paddingBottom: 24, paddingRight: 24 }}>
            <Button key="save" type="primary" onClick={form.submit}>
              保存
            </Button>
            <Button key="cancel" onClick={() => setHide(null)}>
              取消
            </Button>
          </div>
        }
      >
        <ProCard>
          <FormRender
            form={form}
            schema={basicSchema({ hide })}
            widgets={{
              upload: Upload,
            }}
            onFinish={onFinish}
          />
        </ProCard>
      </AModal>
    </Fragment>
  );
};
