import { deleteItem, selectById, selectPage } from '@/service/homeManage/bannerManage';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import { Fragment, useEffect, useRef } from 'react';
import Config from './Details/Config';
import { columns } from './columns';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { visible, reload } = useSelector((state) => state.bannerManage);
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

  const { mutateAsync } = useReactMutation({
    mutationFn: selectById,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        update({
          visible: true,
          queryInfo: {
            ...result,
            content: (result.content && JSON.parse(result.content)) || {},
          },
        });
      }
    },
  });

  // 删除接口
  const { mutateAsync: mutateDeleteAsync } = useReactMutation({
    mutationFn: deleteItem,
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
      update({ visible: true, queryInfo: { status: 1, type: 1 } });
    }
    if (type === 'edit') {
      mutateAsync({ id: record.id });
    }
    if (type === 'delete') {
      modal.confirm({
        title: '温馨提示',
        content: '确定是否删除',
        onOk: () => mutateDeleteAsync({ id: record.id }),
      });
    }
  };

  return (
    <Fragment>
      {visible ? (
        <Config />
      ) : (
        <ProTable
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
          cardBordered={true}
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
      )}
    </Fragment>
  );
};
