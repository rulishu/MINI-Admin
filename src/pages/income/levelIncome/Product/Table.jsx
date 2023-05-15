import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useRef, useState } from 'react';
import { columns } from './columns';

const Income = () => {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);

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
        toolbar={{
          actions: (
            <ButtonGroupPro
              button={[
                {
                  type: 'primary',
                  label: '添加',
                },
                {
                  type: 'primary',
                  label: '导入Excel',
                },
                {
                  type: 'primary',
                  label: '下载模版',
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
    </div>
  );
};
export default Income;
