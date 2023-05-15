import { selectPage } from '@/service/order/abnormal';
import { ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const [collapsed, setCollapsed] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const handle = (type) => {};

  return (
    <>
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
              // success: true,
            };
          }
        }}
        search={{
          collapsed,
          onCollapse: setCollapsed,
        }}
        pagination={{
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns(handle)}
        rowKey="id"
      />
    </>
  );
}
