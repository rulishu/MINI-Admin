import { ButtonGroupPro, CardPro } from '@antdp/antdp-ui';
// import {
//   LightFilter,
//   ProForm,
//   ProFormDatePicker,
//   ProFormRadio,
//   ProFormSelect,
//   ProFormText,
//   QueryFilter,
// } from '@ant-design/pro-components';
import { Table } from 'antd';
import { columns } from './columns';

export default function SearchTable() {
  return (
    <div>
      <CardPro>
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '创建导出任务',
              onClick: () => {},
            },
            {
              type: 'primary',
              label: '查看导出列表',
              onClick: () => {},
            },
          ]}
        />
        <Table
          rowSelection={
            {
              // type: selectionType,
              // ...rowSelection,
            }
          }
          bordered
          rowKey="id"
          columns={columns}
          dataSource={[{ number: 1, name: '章三' }]}
        />
      </CardPro>
    </div>
  );
}
