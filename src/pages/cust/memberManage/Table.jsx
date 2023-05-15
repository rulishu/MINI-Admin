import { selectById, selectPage } from '@/service/memberManage';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch } from '@umijs/max';
import { columns } from './columns';

export default function SearchTable() {
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'memberManage/update',
      payload: data,
    });
  };

  const { mutateAsync } = useReactMutation({
    mutationFn: selectById,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        update({ visible: true, queryData: result });
      }
    },
  });

  const handleEdit = (type, data) => {
    if (type === 'view') {
      mutateAsync({ id: data.id });
    }
  };

  return (
    <ProTable
      options={false}
      request={async (params = {}) => {
        const { current, pageSize, ...formData } = params;
        const { code, result } = await selectPage({
          pageNum: current,
          pageSize,
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
        showSizeChanger: true,
      }}
      cardBordered
      columns={columns(handleEdit)}
      rowKey="id"
      search={{
        defaultCollapsed: false,
      }}
      // toolBarRender={() => (
      //   <ButtonGroupPro
      //     button={[
      //       {
      //         type: 'primary',
      //         label: '创建导出任务',
      //         onClick: () => handle('add'),
      //       },
      //       {
      //         type: 'primary',
      //         label: '查看导出列表',
      //         onClick: () => handle('view'),
      //       },
      //       {
      //         type: 'primary',
      //         label: '查看优惠卷发放记录',
      //         onClick: () => handle('record'),
      //       },
      //     ]}
      //   />
      // )}
    />
  );
}
