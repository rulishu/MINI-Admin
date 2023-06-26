import { selectPage } from '@/service/cust/custManage';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Fragment } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  const dispatch = useDispatch();
  const {
    commentManager: { dataSource },
  } = useSelector((state) => state);
  const updateFn = (payload) => {
    dispatch({
      type: 'commentManager/update',
      payload: payload,
    });
  };
  // eslint-disable-next-line no-unused-vars
  const handleEdit = (type, data) => {};

  return (
    <Fragment>
      <ProTable
        headerTitle="评论列表"
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
            updateFn({ dataSource: result.records || [] });
            return {
              total: result.total,
              success: true,
            };
          }
        }}
        dataSource={dataSource}
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
    </Fragment>
  );
}
