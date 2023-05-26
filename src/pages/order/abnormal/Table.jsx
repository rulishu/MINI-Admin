import { details, selectPage } from '@/service/order/abnormal';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Fragment, useRef } from 'react';
import Details from './Details/Details';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();

  const dispatch = useDispatch();
  const updateFn = (payload) => {
    dispatch({
      type: 'abnormal/update',
      payload: payload,
    });
  };

  const handle = async (type, data) => {
    updateFn({ type: type });
    if (type === 'view') {
      const { code, result } = await details({ id: data?.id });
      if (code === 200) {
        updateFn({ queryData: result, visible: true });
      }
    }
  };

  return (
    <Fragment>
      <ProTable
        headerTitle="异常订单"
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, result } = await selectPage({
            pageSize,
            pageNum: current,
            ...formData,
          });
          if (code && code === 200) {
            return {
              data: result.records || [],
              total: result.total,
              // success: true,
            };
          }
        }}
        pagination={{
          style: { margin: 12 },
          showSizeChanger: true,
        }}
        cardProps={{
          headStyle: {},
          bodyStyle: { padding: 0 },
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        cardBordered={true}
        columns={columns(handle)}
        rowKey="id"
      />
      <Details />
    </Fragment>
  );
}
