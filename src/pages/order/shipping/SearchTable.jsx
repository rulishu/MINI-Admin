import { selectPage } from '@/service/order/shipping';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useDispatch, useSelector } from '@umijs/max';
import { columns } from './columns';

export default function SearchTable() {
  const { selectedRowKeys } = useSelector((state) => state.shipping);
  const dispatch = useDispatch();
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
      cardProps={{
        size: 'small',
        style: {
          padding: 0,
        },
      }}
      columns={columns}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      toolbar={{
        actions: (
          <ButtonGroupPro
            button={[
              {
                label: '批量发货',
                type: 'primary',
              },
              {
                label: '批量修改物流',
                type: 'primary',
              },
              {
                label: '批量取消发货',
                type: 'primary',
              },
              {
                label: '下载批量发货模板',
                type: 'link',
              },
              {
                label: '下载批量修改物流模板',
                type: 'link',
              },
            ]}
          />
        ),
      }}
      rowSelection={{
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          dispatch({
            type: 'shipping/update',
            payload: {
              select: { selectedRowKeys: selectedRowKeys, selectedRows: selectedRows },
            },
          });
        },
      }}
    />
  );
}
