import { selectPage } from '@/service/fansManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useState } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  const [pageSize, setPageSize] = useState(10);
  // const { store, setStore, select } = useModel('memberManage', (model) => ({ ...model }));
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
        pageSize: pageSize,
        onChange: (_, pageSize) => setPageSize(pageSize),
        showSizeChanger: true,
      }}
      cardBordered
      columns={columns}
      rowKey="id"
      search={{
        // optionRender: false,
        defaultCollapsed: false,
        // collapsed: false,
      }}
      // rowSelection={{
      //   selectedRowKeys: select.selectedRowKeys,
      //   onChange: (selectedRowKeys, selectedRows) =>
      //     update({ select: { selectedRowKeys: selectedRowKeys, selectedRows: selectedRows } }),
      // }}
      toolBarRender={() => (
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '创建导出任务',
              // onClick: () => setStore({ ...store, visible: true }),
            },
            {
              type: 'primary',
              label: '查看导出列表',
            },
          ]}
        />
      )}
    />
  );
}
