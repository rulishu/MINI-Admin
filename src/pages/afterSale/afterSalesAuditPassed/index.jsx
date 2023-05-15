import { selectById, selectByRefund, selectPage } from '@/service/afterSale/afterSalesAuditPassed';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch } from '@umijs/max';
import { useRef } from 'react';
import Details from './Details/details';
import Refund from './Details/refund';
import RefundDetails from './Details/refundDetails';
import { columns } from './columns';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'afterSalesAuditPassed/update',
      payload: data,
    });
  };

  const { mutateAsync: mutateAsyncById, data: result } = useReactMutation({
    mutationFn: selectById,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          detailVisible: true,
        });
      }
    },
  });

  // 退款详情
  const { mutateAsync: mutateByRefund, data } = useReactMutation({
    mutationFn: selectByRefund,
    onSuccess: ({ code }) => {
      if (code && code === 200) {
        update({
          visible: true,
        });
      }
    },
  });

  const handleEdit = (type, record) => {
    update({ type });
    if (type === 'refundDetails') {
      mutateByRefund({ id: record.id });
    }
    if (type === 'refund') {
      update({
        refundVisible: true,
        refundInfo: {
          outOrderNo: record.orderNumber,
          amount: record.payAmount,
          userId: record.userId,
          afterServiceId: record.id,
        },
      });
    }
    if (type === 'view') {
      mutateAsyncById({ id: record.id });
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
      <RefundDetails dataSource={data?.result || []} />
      <Refund reload={ref?.current?.reload} />
      <Details info={result?.result || {}} />
    </div>
  );
};
