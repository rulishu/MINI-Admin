import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Col, Input, Row, Space } from 'antd';
import { useRef, useState } from 'react';
import { columnspro } from './columns';

export default function Tables() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  return (
    <div>
      <Row>
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 20 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 80,
                }}
                defaultValue="商品名称"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="请输入商品名称"
              />
            </Space.Compact>
          </Space>
        </Col>
      </Row>
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
                  label: '添加',
                },
                {
                  type: 'primary',
                  label: '查询',
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
        columns={columnspro}
        rowKey="id"
      />
    </div>
  );
}