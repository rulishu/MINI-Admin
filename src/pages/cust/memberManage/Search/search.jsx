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
import { columns } from '../Table/columns'

export default function Search() {
  return (
    <div>
      <QueryFilter defaultCollapsed split>
        <ProFormText name="name" label="会员编号" />
        <ProFormSelect name="level" label="会员等级" />
        <ProFormSelect name="source" label="来源" />
        <ProFormSelect name="label" label="标签" />
        <ProFormSelect name="label" label="门店信息" />
      </QueryFilter>
    </div>
  );
}