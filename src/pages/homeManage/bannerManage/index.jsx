import { deleteItem, selectPage } from '@/service/homeManage/bannerManage';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Edit from './Details/Edit';
import PhoneDemo from './Details/PhoneDemo';
import { columns } from './columns';
import styles from './styles.less';

export default () => {
  const ref = useRef();
  const [collaspe, setCollaspe] = useState(false);
  const { reload, tabsActive } = useSelector((state) => state.bannerManage);
  const dispatch = useDispatch();
  const { modal } = App.useApp();
  const update = (data) => {
    dispatch({
      type: 'bannerManage/update',
      payload: data,
    });
  };

  // 新增编辑刷新分页
  useEffect(() => {
    if (reload) ref?.current?.reload();
  }, [reload]);

  // 删除接口
  const { mutateAsync: mutateDeleteAsync } = useReactMutation({
    mutationFn: deleteItem,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        ref?.current?.reload();
      }
    },
  });

  // eslint-disable-next-line no-unused-vars
  const handleEdit = (type, record) => {
    update({ type });
    if (type === 'add') {
      update({ visible: true, queryInfo: { sort: 1, category: 1, type: tabsActive } });
    }
    if (type === 'edit') {
      update({ visible: true, queryInfo: { ...record } });
    }
    if (type === 'delete') {
      modal.confirm({
        title: '温馨提示',
        content: '确定是否删除',
        onOk: () => mutateDeleteAsync({ id: record.id }),
      });
    }
  };

  const handleCollaspe = () => setCollaspe(!collaspe);

  const Table = (
    <ProTable
      actionRef={ref}
      options={false}
      search={false}
      request={async () => {
        let body = {
          category: 1,
          type: tabsActive,
        };
        const { code, result } = await selectPage(body);
        if (code && code === 200) {
          const bannerList = (result || []).filter(
            (item) => item.type === 1 && item.category === 1,
          );
          const activityPhotoMap = [1, 2, 3, 4, 5, 6, 7].reduce((prev, curr) => {
            const activityPhoto = (result || []).find(
              (item) => item.type === 2 && item.category === 1 && item.sort === curr,
            );
            return {
              ...prev,
              [`activityPhoto${curr}`]: activityPhoto,
            };
          }, {});
          update({
            dom: {
              weappBannerList: bannerList,
              ...activityPhotoMap,
            },
            reload: false,
          });
          return {
            data: result || [],
            success: true,
          };
        }
      }}
      pagination={false}
      toolBarRender={() => [
        <Button key="add" type="primary" onClick={() => handleEdit('add')}>
          新增
        </Button>,
      ]}
      cardBordered={false}
      columns={columns({ handleEdit })}
      rowKey={(record) => record.id + Date.now()}
    />
  );

  const items = [
    {
      key: '1',
      label: `轮播图`,
      children: Table,
    },
    {
      key: '2',
      label: `活动图`,
      children: Table,
    },
  ];

  return (
    <React.Fragment>
      <ProCard split="vertical" headerBordered bordered>
        <ProCard
          className={styles.page_container}
          title="配置"
          headerBordered
          colSpan={collaspe ? '100%' : '70%'}
        >
          <Tabs
            activeKey={tabsActive}
            size="small"
            onChange={async (key) => {
              await update({ tabsActive: key });
              ref?.current?.reload();
            }}
            items={items}
          />
        </ProCard>
        {!collaspe && (
          <ProCard headerBordered title="预览">
            <PhoneDemo />
          </ProCard>
        )}
      </ProCard>
      <Edit />
      <div onClick={handleCollaspe} className={styles.collaspe_btn}>
        <p>{collaspe ? '展开预览' : '收起预览'}</p>
      </div>
    </React.Fragment>
  );
};
