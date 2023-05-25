import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
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
      toolBarRender={() => [
        <Button key="1" type="primary">
          发布赠品
        </Button>,
        <Button key="2" type="primary">
          上架
        </Button>,
        <Button key="3" type="primary">
          下架
        </Button>,
        <Button key="4" type="primary">
          删除
        </Button>,
        <Button key="5" type="primary">
          改分组
        </Button>,
      ]}
      pagination={{
        pageSize: pageSize,
        onChange: (_, pageSize) => setPageSize(pageSize),
        showSizeChanger: true,
      }}
      cardProps={{
        size: 'small',
        style: {
          padding: 0,
        },
      }}
      cardBordered={true}
      columns={columns}
      rowKey="id"
    />
  );
}
