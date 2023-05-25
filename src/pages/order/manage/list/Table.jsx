import { details, selectPage } from '@/service/order/list';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import React, { useRef } from 'react';
import Edit from './Details/Details';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const dispatch = useDispatch();

  const updateFn = (payload) => {
    dispatch({
      type: 'list/update',
      payload: payload,
    });
  };

  const handle = async (type, data) => {
    updateFn({ type: type });
    if (type === 'view') {
      const { code, result } = await details(data?.id);
      if (code === 200) {
        updateFn({ queryData: result, visible: true });
      }
    }
  };

  return (
    <React.Fragment>
      <ProTable
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
              success: true,
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
      <Edit />
    </React.Fragment>
  );
}
