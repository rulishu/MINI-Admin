import { selectPage } from '@/service/cust/custManage';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { columns } from './columns';
import './index.less';

export default function SearchTable() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const update = (data) => {
    dispatch({
      type: 'custManage/update',
      payload: data,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleEdit = (type, data) => {};

  return (
    <ProTable
      headerTitle="用户列表"
      options={false}
      search={{
        labelWidth: 80,
        labelAlign: 'right',
        span: 8,
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
