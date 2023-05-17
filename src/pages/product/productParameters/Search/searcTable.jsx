import { selectPage } from '@/service/cust/memberManage';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { columns } from './columns';

export default function SearchTable() {
  // eslint-disable-next-line no-unused-vars
  const handle = (type) => {};
  return (
    <>
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
          showSizeChanger: true,
        }}
        cardBordered
        columns={columns}
        rowKey="id"
        search={{
          defaultCollapsed: false,
          searchText: '搜索',
        }}
        toolBarRender={() => (
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
        )}
      />
    </>
  );
}
