import { selectPage, update } from '@/service/cust/commentManager';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Fragment, useRef } from 'react';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
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

  const { run } = useRequest(update, { manual: true });

  // eslint-disable-next-line no-unused-vars
  const handleEdit = (type, data) => {
    if (type === 'editIsShow') {
      const value = data.isShow === 1 ? 0 : 1;
      run({
        id: data.id,
        isShow: value,
      });
      data.isShow = value;
      updateFn({ dataSource });
    }
  };

  return (
    <Fragment>
      <ProTable
        actionRef={ref}
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
          console.log('current', current);
          const { code, result } = await selectPage({
            pageNum: current,
            pageSize: pageSize,
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
