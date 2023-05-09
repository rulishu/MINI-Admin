import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  return (
    <ProTable
      actionRef={ref}
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
      toolbar={{
        menu: {
          type: 'tab',
          // activeKey: '',
          items: [
            {
              key: '1',
              label: `销售中`,
            },
            {
              key: '2',
              label: `已售空`,
            },
            {
              key: '3',
              label: `未上架`,
            },
          ],
          onChange: () => {},
        },
        actions: (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '发布商品',
                onClick: () => {},
              },
              {
                type: 'primary',
                label: '上架',
              },
              {
                type: 'primary',
                label: '下架',
              },
              {
                type: 'primary',
                label: '删除',
              },
              {
                type: 'primary',
                label: '改分组',
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
