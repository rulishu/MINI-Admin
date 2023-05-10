import { selectPage } from '@/service/memberManage';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { history, useModel } from '@umijs/max';
import { Modal } from 'antd';
import React, { useState } from 'react';
import EditForm from './EditForm';
import { columns } from './columns';

export default function SearchTable() {
  const [pageSize, setPageSize] = useState(10);
  const { update } = useModel('groupManage', (model) => ({ ...model }));

  const handleEdit = (type) => {
    update({ type });
    if (type === 'add') {
      update({
        queryInfo: {},
        visible: true,
      });
    }
    if (type === 'edit') {
      update({
        queryInfo: { input: '测试编辑' },
        visible: true,
      });
    }
    if (type === 'manage') {
      history.push('/product/productManage');
    }
    if (type === 'delete') {
      Modal.confirm({
        title: '确定是否删除',
        onOk: () => {},
      });
    }
  };

  return (
    <React.Fragment>
      <ProTable
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
        pagination={{
          pageSize: pageSize,
          onChange: (_, pageSize) => setPageSize(pageSize),
          showSizeChanger: true,
        }}
        cardBordered
        columns={columns({ handleEdit })}
        rowKey="id"
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={() => (
          <ButtonGroupPro
            button={[
              {
                type: 'primary',
                label: '新增分组',
                onClick: () => handleEdit('add'),
              },
            ]}
          />
        )}
      />
      <EditForm />
    </React.Fragment>
  );
}
