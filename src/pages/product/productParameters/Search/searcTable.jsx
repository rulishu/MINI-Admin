import { selectPage } from '@/service/cust/memberManage';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
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
        toolBarRender={() => [
          <Button type="primary" onClick={() => handle('add')}>
            新增参数
          </Button>,
          <Button type="primary" onClick={() => handle('add')}>
            同步系统参数模版
          </Button>,
        ]}
      />
    </>
  );
}
