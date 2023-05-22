import { deleteItem, selectById, selectPage } from '@/service/afterSale/afterSalesReasons';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useEffect, useRef } from 'react';
import Details from './Details';
import { columns } from './columns';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { reload } = useSelector((state) => state.territory);
  const update = (data) => {
    dispatch({
      type: 'territory/update',
      payload: data,
    });
  };

  useEffect(() => {
    dispatch({ type: 'commonInterface/getTreeList' });
  }, []);

  // 新增编辑刷新分页
  useEffect(() => {
    if (reload) ref?.current?.reload();
  }, [reload]);

  // 详情接口
  const { mutateAsync } = useReactMutation({
    mutationFn: selectById,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        update({
          visible: true,
          queryInfo: result,
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

  // 操作
  const handleEdit = (type, record) => {
    update({ type });
    if (type === 'add') {
      update({ visible: true, queryInfo: {} });
    }
    if (type === 'edit') {
      mutateAsync({ id: record.id });
    }
    if (type === 'delete') {
      Modal.confirm({
        title: '温馨提醒',
        content: '删除代理，该地盘的分润会向上级地盘追溯，请悉知！确认删除？',
        onOk: () => mutateDeleteAsync({ id: record.id }),
      });
    }
  };
  return (
    <div>
      <ProTable
        actionRef={ref}
        options={false}
        search={{
          labelWidth: 'auto',
          optionRender: () => (
            <Button type="primary" onClick={() => ref?.current?.reload()}>
              搜索
            </Button>
          ),
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
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns({ handleEdit })}
        rowKey="id"
        scroll={{ x: 1300 }}
      />
      <Details />
    </div>
  );
};
