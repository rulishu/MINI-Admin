import { selectPage, updateInfo } from '@/service/homeManage/bannerManage';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import { Fragment, useEffect, useRef } from 'react';
import Config from './Details/Config';
import { columns } from './columns';
import './index.less';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { modal } = App.useApp();
  const { activeKey, reload } = useSelector((state) => state.bannerManage);

  useEffect(() => {
    if (reload) {
      ref?.current?.reload();
    }
  }, [reload]);

  const update = (data) => {
    dispatch({
      type: 'bannerManage/update',
      payload: data,
    });
  };

  // 上架/下架接口
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
        className="table_card"
        options={false}
        headerTitle={activeKey === 1 ? 'Banner列表' : '活动列表'}
        actionRef={ref}
        search={{
          labelWidth: 'auto',
          className: 'search_form',
        }}
        params={{
          type: activeKey,
        }}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          let body = {
            pageNum: current,
            pageSize,
            ...formData,
          };
          const { code, result } = await selectPage(body);
          if (code && code === 200) {
            update({
              reload: false,
            });
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
        rowKey={(record) => record.id + new Date().toUTCString()}
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
      <Config />
    </Fragment>
  );
};
