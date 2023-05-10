import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Col, Input, Row, Select, Space } from 'antd';
import { useRef, useState } from 'react';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const { Option } = Select;
  const [pageSize, setPageSize] = useState(10);
  return (
    <div>
      <Row>
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 20, marginRight: 50 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 80,
                }}
                defaultValue="会员编号"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="请输入会员编号"
              />
            </Space.Compact>
          </Space>
          <Space direction="vertical" size="middle" style={{ marginBottom: 20, marginRight: 50 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 80,
                }}
                defaultValue="会员编号"
                disabled
              />
              <Input
                style={{
                  width: 400,
                }}
                placeholder="请输入会员编号"
              />
            </Space.Compact>
          </Space>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact block>
              <Input
                type="primary"
                defaultValue="区域"
                style={{
                  width: 50,
                }}
                disabled
              />
              <Select defaultValue="选择省">
                <Option value="Option1-1">Option1-1</Option>
                <Option value="Option1-2">Option1-2</Option>
              </Select>
              <Select defaultValue="选择市">
                <Option value="Option1-1">Option1-1</Option>
                <Option value="Option1-2">Option1-2</Option>
              </Select>
              <Select defaultValue="选择区">
                <Option value="Option1-1">Option1-1</Option>
                <Option value="Option1-2">Option1-2</Option>
              </Select>
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
        columns={columns}
        rowKey="id"
      />
    </div>
  );
}
