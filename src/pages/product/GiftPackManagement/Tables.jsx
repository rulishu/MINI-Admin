import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useRef, useState } from 'react';
import { columns } from './columns';
import { Input, Space, Switch, Row, Col } from 'antd'

export default function Tables() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 200,
                }}
                defaultValue="平级越级不产生店主收益:"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="是否开启平级/越级不产生店主收益"
                disabled
              />
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="已开启" unCheckedChildren="启用" defaultChecked />
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
        title={() => (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '添加',
              },
            ]}
          />
        )}
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
    </div>
  );
}
