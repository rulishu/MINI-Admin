import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useRef } from 'react';
import { columns } from './columns';

const AuditSettings = () => {
  const ref = useRef();
  return (
    <div>
      <ProTable
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, data } = await selectPage({
            pageNum: current,
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
        search={false}
        toolbar={{
          actions: (
            <ButtonGroupPro
              button={[
                {
                  type: 'primary',
                  label: '审核控制项',
                },
                {
                  type: 'primary',
                  label: '添加会员',
                },
              ]}
            />
          ),
        }}
        cardBordered={true}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};
export default AuditSettings;
