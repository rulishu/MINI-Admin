import { selectPage } from '@/service/tagsManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { useState } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  const [pageSize, setPageSize] = useState(10);
  const { store, setStore } = useModel('tagsManage', (model) => ({ ...model }));
  return (
    <ProTable
      options={false}
      request={async (params = {}) => {
        const { current, pageSize, ...formData } = params;
        const { code, data } = await selectPage({
          current,
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
        pageSize: pageSize,
        onChange: (_, pageSize) => setPageSize(pageSize),
        showSizeChanger: true,
      }}
      cardBordered
      columns={columns}
      rowKey="id"
      toolBarRender={() => (
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '添加手动标签',
              onClick: () => setStore({ ...store, visible: true }),
            },
            {
              type: 'primary',
              label: '导出标签',
            },
          ]}
        />
      )}
    />
  );
}
