import { queryUserDsConfig } from '@/service/profitSharing/members';
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
      type: 'members/update',
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
        headerTitle="说明：会员分润基数为实际毛利"
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
        // pagination={false}
        cardBordered={true}
        columns={columns(edit)}
        rowKey="totalPercent"
      />
      <Edit tableRef={ref} />
    </>
  );
}
