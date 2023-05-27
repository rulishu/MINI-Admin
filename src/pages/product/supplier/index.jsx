import { deleteItem, selectById, selectPage } from '@/service/goods/supplier';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch, useSelector } from '@umijs/max';
import { App, Button } from 'antd';
import { Fragment, useEffect, useRef } from 'react';
import Details from './Details';
import { columns } from './columns';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { modal } = App.useApp();
  const { reload, userList } = useSelector((state) => state.supplier);
  const update = (data) => {
    dispatch({
      type: 'supplier/update',
      payload: data,
    });
  };

  useEffect(() => {
    dispatch({ type: 'supplier/getUserList' });
    dispatch({ type: 'commonInterface/getTreeList' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 新增编辑刷新分页
  useEffect(() => {
    if (reload) {
      ref?.current?.reload();
      dispatch({ type: 'supplier/getUserList' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // 详情接口
  const { mutateAsync } = useReactMutation({
    mutationFn: selectById,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        update({
          visible: true,
          queryInfo: {
            ...result,
          },
        });
      }
    },
  });

  // 删除接口
  const { mutateAsync: mutateDeleteAsync } = useReactMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      if (data?.code && data?.code === 200) {
        ref?.current?.reload();
        dispatch({
          type: 'supplier/getUserList',
          payload: {},
        });
      } else {
        modal.confirm({
          title: '无法删除',
          content: data?.message,
          maskClosable: true,
          autoFocusButton: null,
        });
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
      mutateAsync({ id: record.supplierId });
    }
    if (type === 'delete') {
      if (record.flag) {
        modal.error({
          title: '无法删除',
          content: '该供应商存在未下架商品，请优先处理商品',
          maskClosable: true,
        });
        return;
      }
      modal.confirm({
        title: '温馨提示',
        content: '确定是否删除该供应商？',
        maskClosable: true,
        autoFocusButton: null,
        onOk: () => mutateDeleteAsync({ id: record.supplierId }),
      });
    }
  };
  return (
    <Fragment>
      <ProTable
        headerTitle="供应商列表"
        actionRef={ref}
        options={false}
        defaultSize="small"
        form={{
          defaultCollapsed: false,
        }}
        search={{
          labelWidth: 'auto',
        }}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          let body = {
            ...formData,
            pageNum: current,
            pageSize,
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
            新增供应商
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
        columns={columns({
          handleEdit,
          productSelector: {
            options: userList.map((item) => ({
              label: item.productSelector,
              value: item.productId,
            })),
          },
        })}
        rowKey="supplierId"
        scroll={{ x: 1300 }}
      />
      <Details />
    </Fragment>
  );
};
