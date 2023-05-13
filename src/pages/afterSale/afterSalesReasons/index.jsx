import { deleteItem, selectById, selectPage } from '@/service/afterSalesReasons';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch } from '@umijs/max';
import { Modal } from 'antd';
import { useRef } from 'react';
import Details from './Details';
import { columns } from './columns';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();

  // 详情
  const { mutateAsync } = useReactMutation({
    mutationFn: selectById,
    onSuccess: ({ code, result }) => {
      if (code === 200) {
        update({
          visible: true,
          queryInfo: result,
        });
      }
    },
  });
  const { mutateAsync: mutateDeleteAsync } = useReactMutation({
    mutationFn: deleteItem,
    onSuccess: ({ code }) => {
      if (code === 200) {
        ref?.current?.reload();
      }
    },
  });
  const update = (data) => {
    dispatch({
      type: 'afterSalesReasons/update',
      payload: data,
    });
  };
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
        title: '确定是否删除',
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
          labelWidth: 120,
        }}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          let body = {
            pageNum: current,
            pageSize,
            ...formData,
          };
          const { code, result } = await selectPage(body);
          if (code === 200) {
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
        toolbar={{
          actions: (
            <ButtonGroupPro
              button={[
                {
                  label: '新增申请原因',
                  type: 'primary',
                  onClick: () => handleEdit('add'),
                },
              ]}
            />
          ),
        }}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns({ handleEdit })}
        rowKey="id"
        scroll={{ x: 1300 }}
      />
      <Details reload={ref?.current?.reload} />
    </div>
  );
};
