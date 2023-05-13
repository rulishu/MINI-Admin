import { details, selectPage } from '@/service/orderManage';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { useRef, useState } from 'react';
import Edit from './Edit';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(10);
  const [collapsed, setCollapsed] = useState(false);

  const updateFn = (payload) => {
    dispatch({
      type: 'orderManage/update',
      payload: payload,
    });
  };
  const handle = async (type, data) => {
    if (type === 'view') {
      updateFn({ visible: true });
      const { code, result } = await details(data?.id);
      if (code === 200) {
        updateFn({ queryData: result });
      }
    }
  };

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
          if (code === 200) {
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
        search={{
          collapsed,
          onCollapse: setCollapsed,
        }}
        pagination={{
          showSizeChanger: true,
          pageSize: pageSize,
          onChange: (_, pageSize) => setPageSize(pageSize),
        }}
        cardBordered={true}
        columns={columns(handle)}
        rowKey="id"
      />
      <Edit />
    </>
  );
}
