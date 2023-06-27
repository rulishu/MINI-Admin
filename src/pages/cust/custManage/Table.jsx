import { selectPage } from '@/service/cust/custManage';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Fragment } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  // eslint-disable-next-line no-unused-vars
  const handleEdit = (type, data) => {
    if (type === 'view') {
      history.push(`/cust/userDetail/${data.id}`);
    }
  };

  return (
    <Fragment>
      <ProTable
        headerTitle="用户列表"
        options={false}
        search={{
          labelWidth: 80,
          labelAlign: 'right',
          span: 8,
          style: {
            padding: '12px 12px 12px 0px',
          },
        }}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, result } = await selectPage({
            pageNum: current,
            pageSize,
            ...formData,
          });
          if (code && code === 200) {
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
        pagination={{
          showSizeChanger: true,
          onChange: () => {
            const node = document.querySelector('.ant-layout-content');
            node.scrollTop = 0;
          },
        }}
        cardProps={{
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        cardBordered
        columns={columns({ handleEdit })}
        rowKey="id"
      />
    </Fragment>
  );
}
