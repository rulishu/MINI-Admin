import { selectPage } from '@/service/pointsManagement';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  return (
    <ProTable
      headerTitle="会员积分"
      search={{
        defaultCollapsed: false,
        labelWidth: 'auto',
      }}
      cardProps={{
        size: 'small',
        style: {
          padding: 0,
        },
      }}
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
      toolBarRender={() => [
        <Button key="export" type="primary">
          导出
        </Button>,
      ]}
      pagination={{
        pageSize: pageSize,
        onChange: (_, pageSize) => setPageSize(pageSize),
        showSizeChanger: true,
      }}
      cardBordered={true}
      columns={columns}
      rowKey="id"
    />
  );
}
