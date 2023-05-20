import { queryOne } from '@/service/profitSharing/referrer';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { useRef } from 'react';
import Edit from './Edit';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'referrer/update',
      payload: data,
    });
  };
  const edit = (data) => {
    update({
      queryData: { ...data },
      visible: true,
    });
  };
  return (
    <>
      <ProTable
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { ...formData } = params;
          const { code, result } = await queryOne({
            configType: 7,
            ...formData,
          });
          if (code && code === 200) {
            const source = [];
            source.push(result);
            return {
              data: source || [],
              success: true,
            };
          }
        }}
        search={false}
        pagination={false}
        cardBordered={true}
        columns={columns(edit)}
        rowKey="id"
      />
      <Edit tableRef={ref} />
    </>
  );
}
