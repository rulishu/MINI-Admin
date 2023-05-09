import { selectPage } from '@/service/memberManage';
import { ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Drawer } from 'antd';
import { useState } from 'react';
import { columns } from './columns';

export default function Edit() {
  const {
    store,
    store: { addVisible },
    setStore,
  } = useModel('memberManage', (model) => ({ ...model }));
  const [pageSize, setPageSize] = useState(10);
  const close = () => setStore({ ...store, addVisible: false });

  return (
    <Drawer open={addVisible} onClose={close} destroyOnClose size="large">
      <ProTable
        visible={addVisible}
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
          // optionRender: false,
          defaultCollapsed: false,
          // collapsed: false,
        }}
      />
    </Drawer>
  );
}
