import { selectByFans } from '@/service/cust/userDetail';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { columns } from './items';

const RenderTable = forwardRef(({ search }, ref) => {
  const tableRef = useRef();
  const {
    userDetail: { reload },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    ...tableRef,
  }));

  useEffect(() => {
    if (reload) tableRef?.current?.reload();
  }, [reload]);

  return (
    <ProTable
      actionRef={tableRef}
      options={false}
      request={async (params = {}) => {
        const { current, pageSize } = params;
        const { code, result } = await selectByFans({
          pageNum: current,
          pageSize,
          ...search,
        });
        if (code && code === 200) {
          dispatch({
            type: 'userDetail/update',
            payload: {
              reload: false,
            },
          });
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
      cardBordered={false}
      columns={columns}
      rowKey="userId"
      search={false}
      cardProps={{
        size: 'small',
        style: {
          padding: 0,
        },
      }}
    />
  );
});

export default RenderTable;
