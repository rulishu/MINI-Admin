import { selectPage } from '@/service/memberManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
// import { useModel } from '@umijs/max';
import { columns } from './columns';

export default function SearchTable() {
  // const [pageSize, setPageSize] = useState(10);
  // const { store, setStore } = useModel('memberManage', (model) => ({ ...model }));

  const handle = (type) => {
    if (type === 'add') {
      // setStore({ addVisible: true });
    }
  };
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
        if (code === 200) {
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
      }}
      toolBarRender={() => (
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '创建导出任务',
              onClick: () => handle('add'),
            },
            {
              type: 'primary',
              label: '查看导出列表',
              onClick: () => handle('view'),
            },
            {
              type: 'primary',
              label: '查看优惠卷发放记录',
              onClick: () => handle('record'),
            },
          ]}
        />
      )}
    />
  );
}
