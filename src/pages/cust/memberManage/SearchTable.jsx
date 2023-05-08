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
import { Table, Form } from 'antd'
import { useTable } from '@antdp/hooks';
import { columns } from './columns'
import { request } from '@umijs/max'

export default function SearchTable() {
  const [form] = Form.useForm();
  const selectPage = async (params) => {
    return request('/api/selectPage', {
      method: 'POST',
      data: params,
    });
  };
  // 分页接口
  const { tableProps, search } = useTable(
    async (params, formData) => {
      const { code, data } = await selectPage({
        ...params,
        queryData: { ...formData },
      });
      if (code === 1) {
        return {
          list: data.rows || [],
          total: data.total,
        };
      }
    },
    {
      form,
      defaultParams: [
        { current: 1, pageSize: 20 },
        { name: '123' },
      ],
    },
  );

  const { submit, reset } = search;
  console.log('tableProps',tableProps)
  return (
    <div>
      <QueryFilter
        form={form}
        defaultCollapsed={false}
        layout="vertical"
        onFinish={submit}
        onReset={reset}
      >
        <ProFormText name="name" label="会员编号" rules={[{ required: true }]} />
        <ProFormSelect
          name="status"
          label="会员等级"
          options={[
            { label: '全部', value: 'all' },
            { label: '粉丝', value: 'open' },
            { label: 'VIP奋斗者', value: 'closed' },
          ]}
        />
        <ProFormSelect
          name="status2"
          label="来源"
          options={[
            { label: '全部', value: 'all' },
            { label: '小程序', value: 'open' },
            { label: 'APP', value: 'closed' },
          ]}
        />
        <ProFormSelect
          name="status3"
          label="门店信息"
          options={[]}
        />
      </QueryFilter>
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
              label: '查看优惠券发放记录',
              onClick: () => { },
            }
          ]}
        />
        <Table {...tableProps} bordered rowKey="id" columns={columns} />
      </CardPro>
    </div>
  );
}