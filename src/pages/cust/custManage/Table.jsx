import { selectById, selectPage } from '@/service/cust/custManage';
import { ProTable } from '@ant-design/pro-components';
import { useReactMutation } from '@antdp/hooks';
import { useDispatch } from '@umijs/max';
import { columns } from './columns';

export default function SearchTable() {
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'custManage/update',
      payload: data,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const { mutateAsync } = useReactMutation({
    mutationFn: selectById,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        update({ visible: true, queryData: result });
      }
    },
  });

  // eslint-disable-next-line no-unused-vars
  const handleEdit = (type, data) => {
    if (type === 'view') {
      //  mutateAsync({ id: data.id });
    }
  };

  return (
    <ProTable
      headerTitle="用户列表"
      options={false}
      search={{
        labelWidth: 'auto',
      }}
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
      cardProps={{
        size: 'small',
        style: {
          padding: 0,
        },
      }}
      cardBordered
      columns={columns({ handleEdit })}
      rowKey="id"
    />
  );
}
