import React from 'react'
import { CardPro, ButtonGroupPro } from '@antdp/antdp-ui'
import {
  LightFilter,
  ProForm,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { Table } from 'antd'
import { columns } from './columns'

export default function SearchTable() {
  return (
    <div>
      <LightFilter
        span={24}
        labelWidth="auto"
        split
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          <ProFormText
            width="md"
            name="company"
            label="我方公司名称"
            placeholder="请输入名称"
          />
        </ProForm.Group>
      </LightFilter>
      <CardPro>
        <ButtonGroupPro
          button={[
            {
              type: 'primary',
              label: '新增',
              onClick: () => { },
            },
            {
              type: 'primary',
              label: '删除',
              onClick: () => { },
            }
          ]}
        />
        <Table bordered rowKey="id" columns={columns} />
      </CardPro>
    </div>
  );
}