import { selectPage } from '@/service/tagsManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  const { store, setStore } = useModel('tagsManage', (model) => ({ ...model }));
  return (
    <ProTable
      actionRef={ref}
      options={false}
      request={async (params = {}) => {
        console.log('params', params);
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
      toolbar={{
        menu: {
          type: 'tab',
          activeKey: store.activeKey,
          items: [
            {
              key: 'tab1',
              label: '手动标签',
            },
            {
              key: 'tab2',
              label: '自动标签',
            },
          ],
          onChange: (key) => {
            setStore({ ...store, activeKey: key });
            ref.current.reload();
          },
        },
        actions: (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '添加手动标签',
                onClick: () => {
                  setStore({ ...store, visible: true });
                },
              },
              {
                type: 'primary',
                label: '导出标签',
              },
            ]}
          />
        ),
      }}
      pagination={{
        pageSize: pageSize,
        onChange: (_, pageSize) => setPageSize(pageSize),
        showSizeChanger: true,
      }}
      cardBordered={true}
      columns={columns}
      rowKey="id"
    />
  );
}
