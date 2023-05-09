import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Button, Tabs } from 'antd';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);

  const items = [
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
  ];
  return (
    <div>
      <ButtonGroupPro
        button={[
          {
            type: 'primary',
            label: '发布商品',
            onClick: () => {},
          },
        ]}
      />
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
        title={() => <Tabs defaultActiveKey="1" type="card" items={items} />}
        pagination={{
          pageSize: pageSize,
          onChange: (_, pageSize) => setPageSize(pageSize),
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns}
        rowKey="id"
        footer={() => (
          <>
            <Button style={{ marginRight: 8 }}>上架</Button>
            <Button style={{ marginRight: 8 }}>下架</Button>
            <Button style={{ marginRight: 8 }}>删除</Button>
            <Button style={{ marginRight: 8 }}>改分组</Button>
          </>
        )}
      />
    </div>
  );
}
