import React from 'react'
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
import { Table } from 'antd'
import { columns } from './columns'

export default function SearchTable() {
  return (
    <div>
    <QueryFilter defaultCollapsed split>
      <ProFormText name="name" label="应用名称" />
      <ProFormDatePicker name="createDate" label="创建时间" />
      <ProFormText name="status" label="应用状态" />
      <ProFormDatePicker name="replyDate" label="响应日期" />
      <ProFormDatePicker name="startDate" label="创建时间" />
      <ProFormDatePicker name="endDate" label="结束时间" />
    </QueryFilter>
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