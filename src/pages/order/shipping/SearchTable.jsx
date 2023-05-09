import { selectPage } from '@/service/questionManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useState } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  const [pageSize, setPageSize] = useState(10);
  // const deleteQ = (id) => {

  // }
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
      title={() => (
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '查询',
              // onClick: () => setStore({ ...store, visible: true }),
            },
            {
              label: '批量发货',
            },
            {
              label: '批量修改物流',
            },
            {
              label: '批量取消发货',
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
      )}
    />
  );
}
