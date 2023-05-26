import { selectPage } from '@/service/cust/memberManage';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { columns } from './columns';

export default function SearchTable() {
  // eslint-disable-next-line no-unused-vars
  const handle = (type) => {};
  return (
    <ProTable
      headerTitle="商品参数"
      options={false}
      request={async (params = {}) => {
        const { current, pageSize, ...formData } = params;
        const { code, result } = await selectPage({
          pageNum: current,
          pageSize,
          queryData: { ...formData },
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
        <Button key="save" type="primary" onClick={() => handle('add')}>
          新增参数
        </Button>,
        <Button key="cancel" type="primary" onClick={() => handle('add')}>
          同步系统参数模版
        </Button>,
      ]}
    />
  );
}
