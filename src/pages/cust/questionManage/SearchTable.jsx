import { selectPage } from '@/service/cust/questionManage';
import { ProTable } from '@ant-design/pro-components';
import { columns } from './columns';

export default function SearchTable() {
  return (
    <ProTable
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
      pagination={{
        showSizeChanger: true,
      }}
      cardBordered
      columns={columns}
      rowKey="id"
    />
  );
}
