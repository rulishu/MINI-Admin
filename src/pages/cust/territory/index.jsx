import { deleteItem, selectPage } from '@/service/cust/territory';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import { useEffect, useRef } from 'react';
import Edit from './Details/Edit';
import VideoModal from './Details/VideoModal';
import { columns } from './columns';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { reload } = useSelector((state) => state.territory);
  const { modal } = App.useApp();
  const update = (data) => {
    dispatch({
      type: 'territory/update',
      payload: data,
    });
  };

  // 新增编辑刷新分页
  useEffect(() => {
    if (reload) ref?.current?.reload();
  }, [reload]);

  const { mutateAsync: mutateDeleteAsync } = useReactMutation({
    mutationFn: deleteItem,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        ref?.current?.reload();
      }
    },
  });

  // 操作
  const handleEdit = (type, record) => {
    update({ type });
    if (type === 'add') {
      update({ visible: true, queryInfo: {} });
    }
    if (type === 'edit') {
      dispatch({
        type: 'territory/selectByAgentArea',
        payload: {
          level: record.level,
          agentCompanyId: record.id,
        },
        callback: () =>
          update({
            visible: true,
            queryInfo: record,
          }),
      });
    }
    if (type === 'delete') {
      modal.confirm({
        title: '温馨提醒',
        maskClosable: true,
        content: '删除地盘，该地盘的分润会向上级地盘追溯，请悉知！确认删除？',
        onOk: () => mutateDeleteAsync({ id: record.id }),
      });
    }
    if (type === 'video') {
      update({
        videoVisible: true,
        videoData: { ...record },
      });
    }
  };
  return (
    <div>
      <ProTable
        headerTitle="地盘列表"
        actionRef={ref}
        options={false}
        search={{
          labelWidth: 'auto',
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
            update({ reload: false });
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => handleEdit('add')}>
            新增代理
          </Button>,
        ]}
        cardProps={{
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns({ handleEdit })}
        rowKey="id"
        scroll={{ x: 1300 }}
      />
      <Edit />
      <VideoModal />
    </div>
  );
};
