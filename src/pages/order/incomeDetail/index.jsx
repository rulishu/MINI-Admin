import { selectPage } from '@/service/order/incomeDetail';
import { ProTable } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { columns } from './items';

export default () => {
  const { id } = useParams();
  return (
    <ProTable
      options={false}
      request={async (params = {}) => {
        const { current, pageSize } = params;
        const { code, result } = await selectPage({
          pageNum: current,
          pageSize,
          orderId: id,
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
        showSizeChanger: true,
      }}
      cardBordered
      columns={columns}
      rowKey="id"
      search={false}
      cardProps={{
        size: 'small',
        style: {
          padding: 0,
        },
      }}
    />
  );
};
