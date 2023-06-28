import { selectPage } from '@/service/cust/memberManage';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Button } from 'antd';
import { Fragment } from 'react';
import ModalEditForm from './ModalEditForm';
import { columns } from './columns';

export default function SearchTable() {
  const dispatch = useDispatch();

  const update = (data) => {
    dispatch({
      type: 'salesActivities/update',
      payload: data,
    });
  };

  const handleEdit = (type) => {
    update({ type });
    if (type === 'add') {
      update({ visible: true });
    }
  };

  return (
    <Fragment>
      <ProTable
        headerTitle="优惠卷列表"
        options={false}
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
        }}
        cardBordered
        columns={columns({ handleEdit })}
        rowKey="id"
        search={{
          labelWidth: 100,
          labelAlign: 'right',
          span: 8,
          style: {
            padding: '12px 12px 12px 0px',
          },
        }}
        cardProps={{
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => handleEdit('add')}>
            新建优惠卷
          </Button>,
        ]}
      />
      <ModalEditForm />
    </Fragment>
  );
}
