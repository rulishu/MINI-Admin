import { selectById, selectPage } from '@/service/afterSalesLogList';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch } from '@umijs/max';
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
      if (code && code === 200) {
        update({
          visible: true,
          queryInfo: result,
        });
      }
    },
  });
  const update = (data) => {
    dispatch({
      type: 'afterSalesLogList/update',
      payload: data,
    });
  };
  const handleEdit = (type, record) => {
    update({ type });

    if (type === 'view') {
      mutateAsync({ id: record.id });
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
          if (code && code === 200) {
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
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
