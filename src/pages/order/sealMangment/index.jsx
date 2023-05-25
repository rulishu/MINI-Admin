import { selectPage } from '@/service/afterSale/afterSalesAudit';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { useRef } from 'react';
import { columns } from './columns';

export default () => {
  const ref = useRef();
  const dispatch = useDispatch();

  const update = (data) => {
    dispatch({
      type: 'afterSalesAudit/update',
      payload: data,
    });
  };
  const handleEdit = (type) => {
    update({ type });
  };
  return (
    <div>
      <ProTable
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
        columns={columns({ handleEdit })}
        rowKey="id"
        scroll={{ x: 1300 }}
      />
    </div>
  );
};
