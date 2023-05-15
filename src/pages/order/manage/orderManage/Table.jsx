import { details, selectPage } from '@/service/order/orderManage';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import Edit from './Edit';
import UpOrder from './UpOrder';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const dispatch = useDispatch();
  const { reload } = useSelector((state) => state.orderManage);

  const [pageSize, setPageSize] = useState(10);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (reload) {
      ref?.current?.reload();
    }
  }, [reload]);

  const updateFn = (payload) => {
    dispatch({
      type: 'orderManage/update',
      payload: payload,
    });
  };
  const handle = async (type, data) => {
    updateFn({ type: type });
    if (type === 'view') {
      updateFn({ visible: true });
      const { code, result } = await details(data?.id);
      if (code === 200) {
        updateFn({ queryData: result });
      }
    }
    if (type === 'upOrder') {
      updateFn({ upVisible: true, queryData: { id: data?.id } });
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
            updateFn({ reload: false });
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
      <UpOrder />
    </>
  );
}
