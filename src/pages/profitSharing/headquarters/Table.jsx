import { queryUserDsConfig } from '@/service/profitSharing/headquarters';
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
      type: 'headquarters/update',
      payload: data,
    });
  };
  const edit = (data = {}) => {
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
        request={async () => {
          const { code, result } = await queryUserDsConfig({
            configType: 6,
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
        cardBordered={true}
        columns={columns(edit)}
        rowKey="totalPercent"
      />
      <Edit tableRef={ref} />
    </>
  );
}
