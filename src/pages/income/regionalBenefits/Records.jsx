import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { Col, DatePicker, Input, Row, Select, Space } from 'antd';
import { useRef, useState } from 'react';
import { columnsRecord } from './columns';

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
                addonBefore="订单编号"
                style={{
                  width: 300,
                }}
                placeholder="请输入订单编号"
              />
            </Space.Compact>
          </Space>
          <Space direction="vertical" size="middle" style={{ marginBottom: 20, marginRight: 50 }}>
            <Space.Compact>
              <Input
                addonBefore="收益人名称"
                style={{
                  width: 300,
                }}
                placeholder="请输入收益人名称"
              />
            </Space.Compact>
          </Space>
          <Space direction="vertical" size="middle" style={{ marginBottom: 20, marginRight: 50 }}>
            <Space.Compact>
              <Input
                addonBefore="收益人编号"
                style={{
                  width: 300,
                }}
                placeholder="请输入收益人编号"
              />
            </Space.Compact>
          </Space>
          <Space direction="vertical" size="middle" style={{ marginBottom: 20, marginRight: 50 }}>
            <Space.Compact block>
              <Input
                type="primary"
                defaultValue="结算状态"
                style={{
                  width: 80,
                }}
                disabled
              />
              <Select defaultValue="全部" style={{ width: 100 }}>
                <Option value="Option1-1">全部</Option>
                <Option value="Option1-1">未结算</Option>
                <Option value="Option1-2">已结算</Option>
              </Select>
            </Space.Compact>
          </Space>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact block>
              <Input style={{ width: '30%' }} defaultValue="收益时间" disabled />
              <DatePicker.RangePicker showTime style={{ width: '70%' }} />
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
                  label: '搜索',
                },
                {
                  type: 'primary',
                  label: '导出',
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
        columns={columnsRecord}
        rowKey="id"
      />
    </div>
  );
}
