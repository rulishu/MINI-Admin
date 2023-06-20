import { selectPage } from '@/service/cust/custManage';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Fragment } from 'react';
import Detail from './Details/Details';
import EditModal from './Details/EditModal';
import { columns } from './columns';
import './index.less';

export default function SearchTable() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const update = (data) => {
    dispatch({
      type: 'custManage/update',
      payload: data,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleEdit = (type, data) => {
    update({ type });
    if (type === 'view') {
      update({ visible: true });
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
      <Detail />
      <EditModal />
    </Fragment>
  );
}
