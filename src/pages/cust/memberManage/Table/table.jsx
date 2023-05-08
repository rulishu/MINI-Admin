import React, { useState } from 'react';
import { CardPro, ButtonGroupPro } from '@antdp/antdp-ui'
import {
  LightFilter,
  ProForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { Table, Radio } from 'antd'
import { columns } from './columns'

export default function SearchTable() {
  // const [selectionType, setSelectionType] = useState < 'checkbox' | 'radio' > ('checkbox');

  return (
    <div>
      <CardPro>
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '创建导出任务',
              onClick: () => { },
            },
            {
              type: 'primary',
              label: '查看导出列表',
              onClick: () => { },
            },
            {
              type: 'primary',
              label: '查看优惠卷发放记录',
              onClick: () => { },
            }
          ]}
        />

        {/* <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        >
          <Radio value="checkbox">Checkbox</Radio>
          <Radio value="radio">radio</Radio>
        </Radio.Group>

        <Divider /> */}

        <Table
          rowSelection={{
            // type: selectionType,
            // ...rowSelection,
          }}
          bordered
          rowKey="id"
          columns={columns}
          dataSource={[
            { number: 1, name: '章三' }
          ]}
        />
      </CardPro>
    </div>
  );
}