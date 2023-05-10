import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { Col, Input, Modal, Row, Space, Switch } from 'antd';
import { useRef, useState } from 'react';
import Edit from './Edit/Edit';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  const { update } = useModel('packManagement', (model) => ({ ...model }));

  const handleEdit = async (type, record) => {
    if (type === 'edit') {
      update({
        type: type,
        queryData: record,
        visible: true,
      });
    } else {
      Modal.confirm({
        title: '确定是否删除',
        onOk: () => {
          ref.current.reload();
        },
      });
    }
  };
  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Space direction="vertical" size="middle" style={{ marginBottom: 10 }}>
            <Space.Compact>
              <Input
                style={{
                  width: 200,
                  color: '#555555',
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
        toolbar={{
          actions: (
            <ButtonGroupPro
              button={[
                {
                  type: 'primary',
                  label: '添加',
                  onClick: () => {
                    update({ visible: true });
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
        columns={columns({ handleEdit })}
        rowKey="id"
      />

      <Edit />
    </div>
  );
}
