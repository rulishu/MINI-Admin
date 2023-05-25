import Upload from '@/components/upload';
import { getUrl, getUrlToList } from '@/utils';
import { DownOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Dropdown, Space } from 'antd';
import FormRender, { useForm } from 'form-render';
import { Fragment, useEffect, useState } from 'react';
import PhoneDemo from './PhoneDemo';
import { activiteSchema, bannerSchema, basicSchema, tabsSchema } from './schema';
import styles from './styles.less';

export default () => {
  const dispatch = useDispatch();
  const { message } = App.useApp();
  // eslint-disable-next-line no-unused-vars
  const { queryInfo, type } = useSelector((state) => state.bannerManage);
  const form1 = useForm();
  const form2 = useForm();
  const form3 = useForm();
  const form4 = useForm();
  const [activeKey, setActiveKey] = useState('0');
  const [collaspe, setCollaspe] = useState(false);
  const update = (data) => {
    dispatch({
      type: 'bannerManage/update',
      payload: data,
    });
  };

  const items = [
    { label: '页面配置', key: '0', children: null },
    { label: '轮播图配置', key: '1', children: null },
    { label: '活动图配置', key: '2', children: null },
    { label: '分组配置', key: '3', children: null },
  ];

  const label = items.find((item) => item.key === activeKey) || {};

  useEffect(() => {
    if (activeKey === '0') {
      form1.setValues({
        form: {
          name: queryInfo.name,
          category: queryInfo.category,
        },
      });
    }
    if (activeKey === '1') {
      const { banner = [] } = queryInfo;
      const list = banner.map((item) => ({ ...item, path: getUrlToList(item.path) }));
      form2.setValues({
        form: {
          options: list,
        },
      });
    }
    if (activeKey === '2') {
      const { activite = [] } = queryInfo;
      const list = activite.map((item) => ({ ...item, path: getUrlToList(item.path) }));
      form3.setValues({
        form: {
          options: list,
        },
      });
    }
    if (activeKey === '3') {
      const { tabs = [] } = queryInfo;
      form4.setValues({
        form: {
          options: tabs,
        },
      });
    }
  }, [activeKey]);

  const formFinish = {
    onFinish1: (values) => onFinish('basic', values),
    onFinish2: (values) => onFinish('banner', values),
    onFinish3: (values) => onFinish('activite', values),
    onFinish4: (values) => onFinish('tabs', values),
  };

  const onFinish = (type, value) => {
    const { form } = value;
    if (type === 'basic') {
      update({
        queryInfo: {
          ...queryInfo,
          ...form,
        },
      });
      message.success('页面配置成功');
    }
    if (type === 'banner') {
      const list = (form.options || []).map((item, idx) => ({
        ...item,
        path: getUrl(item.path),
        sort: idx + 1,
      }));
      update({
        queryInfo: {
          ...queryInfo,
          banner: list,
        },
      });
      message.success('轮播图配置成功');
    }
    if (type === 'activite') {
      const list = (form.options || []).map((item, idx) => ({
        ...item,
        path: getUrl(item.path),
        sort: idx + 1,
      }));
      update({
        queryInfo: {
          ...queryInfo,
          activite: list,
        },
      });
      message.success('活动图配置成功');
    }
    if (type === 'tabs') {
      const list = (form.options || []).map((item, idx) => ({
        ...item,
        sort: idx + 1,
      }));
      update({
        queryInfo: {
          ...queryInfo,
          tabs: list,
        },
      });
    }
  };

  console.log('queryInfo', queryInfo);

  const save = async () => {};

  return (
    <Fragment>
      <ProCard
        split="vertical"
        bordered
        headerBordered
        extra={
          <Space>
            <Button type="primary" onClick={save}>
              立即发布
            </Button>
            <Button onClick={() => update({ visible: false })}>返回</Button>
          </Space>
        }
      >
        <ProCard
          colSpan={collaspe ? '100%' : '60%'}
          extra={
            <Dropdown
              menu={{
                items,
                selectable: true,
                selectedKeys: activeKey,
                onSelect: ({ key }) => {
                  setActiveKey(key);
                },
              }}
            >
              <a>
                <Space>
                  {label.label || '请选择'}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          }
        >
          <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            {activeKey === '0' && (
              <FormRender
                form={form1}
                schema={basicSchema}
                widgets={{
                  upload: Upload,
                }}
                onFinish={formFinish['onFinish1']}
                footer={true}
              />
            )}
            {activeKey === '1' && (
              <FormRender
                form={form2}
                schema={bannerSchema}
                widgets={{
                  upload: Upload,
                }}
                footer={true}
                onFinish={formFinish['onFinish2']}
              />
            )}
            {activeKey === '2' && (
              <FormRender
                form={form3}
                schema={activiteSchema}
                widgets={{
                  upload: Upload,
                }}
                footer={true}
                onFinish={formFinish['onFinish3']}
              />
            )}
            {activeKey === '3' && (
              <FormRender
                form={form4}
                schema={tabsSchema}
                footer={true}
                onFinish={formFinish['onFinish4']}
              />
            )}
          </div>
        </ProCard>
        <ProCard headerBordered>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneDemo />
          </div>
        </ProCard>
      </ProCard>
      <div onClick={() => setCollaspe(!collaspe)} className={styles.collaspe_btn}>
        <p>{collaspe ? '展开预览' : '收起预览'}</p>
      </div>
    </Fragment>
  );
};
