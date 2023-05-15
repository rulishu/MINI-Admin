import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Col, Input, Row, Space, Switch } from 'antd';
import { useRef, useState } from 'react';
import { columns } from './columns';

const Income = () => {
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
                defaultValue="级差自购不分佣:"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="是否开启级差自购不分佣(上级级差比例减掉自己的级差比例)"
                disabled
              />
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Switch checkedChildren="禁用" unCheckedChildren="启用" defaultChecked />
        </Col>
      </Row>
      <ProTable
        actionRef={ref}
        options={false}
        search={false}
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
