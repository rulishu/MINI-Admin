import { selectPage } from '@/service/memberManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
// import { useModel } from '@umijs/max';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  const [pageSize, setPageSize] = useState(10);
  // const { store, setStore } = useModel('memberManage', (model) => ({ ...model }));

  const handle = (type) => {
    if (type === 'add') {
      // setStore({ addVisible: true });
    }
  };
  return (
    <>
      <ButtonGroupPro
        button={[
          {
            label: '新增参数',
            icon: <PlusOutlined />,
            onClick: () => handle('add'),
          },
          {
            label: '同步系统参数模版',
            type: 'primary',
            onClick: () => handle('add'),
          },
        ]}
      />
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
        search={{
          defaultCollapsed: false,
          searchText: '搜索',
        }}
      />
    </>
  );
}
