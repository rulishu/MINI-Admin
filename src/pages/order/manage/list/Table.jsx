import { selectPage } from '@/service/equityRules';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useRef, useState } from 'react';
// import Edit from './Edit';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  const [collapsed, setCollapsed] = useState(false);

  const { update } = useModel('equityRules', (model) => ({ ...model }));
  // const reload = ref?.current?.reload;

  const handle = async (type) => {
    if (type === 'view') {
      update({ visible: true });
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
              // success: true,
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
      {/* <Edit reload={reload} /> */}
    </>
  );
}
