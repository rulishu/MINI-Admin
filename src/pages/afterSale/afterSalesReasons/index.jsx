import { deleteItem, selectById, selectPage } from '@/service/afterSale/afterSalesReasons';
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
  const { reload } = useSelector((state) => state.afterSalesReasons);
  const { modal } = App.useApp();
  const update = (data) => {
    dispatch({
      type: 'afterSalesReasons/update',
      payload: data,
    });
  };

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
      modal.confirm({
        title: '温馨提示',
        content: '确定是否删除',
        maskClosable: true,
        onOk: () => mutateDeleteAsync({ id: record.id }),
      });
    }
  };
  return (
    <div>
      <ProTable
        headerTitle="售后原因"
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
        toolbar={{
          actions: (
            <Fragment>
              <Button type="primary" onClick={() => handleEdit('add')}>
                新增申请原因
              </Button>
            </Fragment>
          ),
        }}
        pagination={{
          style: { margin: 12 },
          showSizeChanger: true,
        }}
        cardProps={{
          headStyle: {},
          // bodyStyle: { padding: 0 },
          size: 'small',
          style: {
            padding: 0,
          },
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
