import { selectPage, updateInfo } from '@/service/homeManage/bannerManage';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import { Fragment, useRef } from 'react';
import Config from './Details/Config';
import { columns } from './columns';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { modal } = App.useApp();
  const { activeKey } = useSelector((state) => state.bannerManage);
  const update = (data) => {
    dispatch({
      type: 'bannerManage/update',
      payload: data,
    });
  };

  // 删除接口
  const { mutateAsync: mutateUpdate } = useReactMutation({
    mutationFn: updateInfo,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        ref?.current?.reload();
      }
    },
  });

  //   // eslint-disable-next-line no-unused-vars
  const handleEdit = (type, record) => {
    update({ type });
    if (type === 'add') {
      update({
        visible: true,
        queryInfo: {
          type: activeKey,
        },
      });
    }
    if (type === 'edit') {
      update({ visible: true, queryInfo: { ...record } });
    }
    if (type === 'offShelf') {
      modal.confirm({
        title: '温馨提示',
        maskClosable: true,
        content: '确定是否要下架？',
        onOk: () => mutateUpdate({ id: record.id, status: 0 }),
      });
    }
    if (type === 'grounding') {
      modal.confirm({
        title: '温馨提示',
        maskClosable: true,
        content: '确定是否要上架？',
        onOk: () => mutateUpdate({ id: record.id, status: 1 }),
      });
    }
  };

  return (
    <Fragment>
      <ProTable
        headerTitle={activeKey === 1 ? 'Banner列表' : '活动列表'}
        actionRef={ref}
        options={false}
        search={{
          labelWidth: 'auto',
          style: {},
        }}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          let body = {
            pageNum: current,
            pageSize,
            type: activeKey,
            ...formData,
          };
          const { code, result } = await selectPage(body);
          if (code && code === 200) {
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => handleEdit('add')}>
            新增
          </Button>,
        ]}
        cardBordered={false}
        columns={columns({ handleEdit })}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
        }}
        cardProps={{
          size: 'small',
          style: {
            padding: 0,
          },
        }}
      />
      <Config reload={ref?.current?.reload} />
    </Fragment>
  );
};
