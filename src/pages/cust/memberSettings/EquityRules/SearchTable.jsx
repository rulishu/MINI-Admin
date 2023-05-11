import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function SearchTable(props) {
  const { onEdit, onAdd } = props;
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  return (
    <ProTable
      actionRef={ref}
      options={false}
      request={async (params = {}) => {
        const { current, pageSize } = params;
        const { code, result } = await selectPage({
          pageSize,
          pageNum: current,
        });
        if (code === 200) {
          return {
            data: result.records || [],
            total: result.total,
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
                label: '新建权益规则',
                onClick: () => {
                  onAdd();
                },
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
      columns={columns(onEdit)}
      rowKey="id"
    />
  );
}
