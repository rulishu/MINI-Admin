import { deleteItem, selectPage } from '@/service/cust/agentManagement';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import { useEffect, useRef } from 'react';
import Details from './Details';
import { columns } from './columns';
import './index.less';

export default () => {
  const { modal } = App.useApp();
  const ref = useRef();
  const dispatch = useDispatch();
  const { reload } = useSelector((state) => state.agentManagement);
  const update = (data) => {
    dispatch({
      type: 'agentManagement/update',
      payload: data,
    });
  };

  // 新增编辑刷新分页
  useEffect(() => {
    dispatch({ type: 'agentManagement/selectByAgentCompany' });
    if (reload) ref?.current?.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      update({
        visible: true,
        queryInfo: record,
      });
    }
    if (type === 'delete') {
      if (record?.areaId) {
        modal.error({
          title: '无法删除',
          content: '该代理商已绑定地盘，无法删除',
          maskClosable: true,
        });
        return;
      }
      modal.confirm({
        title: '温馨提醒',
        maskClosable: true,
        content: '删除地盘，该地盘的分润会向上级地盘追溯，请悉知！确认删除？',
        onOk: () => mutateDeleteAsync({ id: record.id }),
      });
    }
  };

  return (
    <div>
      <ProTable
        headerTitle="代理商列表"
        actionRef={ref}
        options={false}
        search={{
          labelWidth: 'auto',
          style: {
            padding: '24px 12px',
          },
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
            新增
          </Button>,
        ]}
        pagination={{
          showSizeChanger: true,
        }}
        cardProps={{
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        cardBordered={true}
        columns={columns({ handleEdit })}
        rowKey="id"
      />
      <Details />
    </div>
  );
};
