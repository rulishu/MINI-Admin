import { selectPage } from '@/service/memberSettings';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useRef, useState } from 'react';
import Search from './Search';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  return (
    <>
      <ProCard bordered style={{ marginBottom: 20 }}>
        <Search />
      </ProCard>
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
          actions: (
            <ButtonGroupPro
              button={[
                {
                  type: 'primary',
                  label: '订单批量留言',
                },
                {
                  type: 'primary',
                  label: '订单批量备注',
                },
                {
                  type: 'primary',
                  label: '订单批量标签',
                },
                {
                  type: 'primary',
                  label: '子订单批量标签',
                },
              ]}
            />
          ),
        }}
        search={false}
        pagination={{
          pageSize: pageSize,
          onChange: (_, pageSize) => setPageSize(pageSize),
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns}
        rowKey="id"
      />
    </>
  );
}
