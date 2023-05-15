import { selectPage } from '@/service/exchangeDetails';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  return (
    <ProTable
      actionRef={ref}
      options={false}
      request={async (params = {}) => {
        const { current, pageSize, ...formData } = params;
        const { code, data } = await selectPage({
          pageNum: current,
          pageSize,
          queryData: { ...formData },
        });
        if (code === 1) {
          return {
            data: data.rows || [],
            total: data.total,
            success: true,
          };
        }
      }}
      toolbar={{
        actions: (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '导出',
              },
            ]}
          />
        ),
      }}
      pagination={{
        pageSize: pageSize,
        onChange: (_, pageSize) => setPageSize(pageSize),
        showSizeChanger: true,
      }}
      search={{
        defaultCollapsed: false,
      }}
      cardBordered={true}
      columns={columns}
      rowKey="id"
    />
  );
}
