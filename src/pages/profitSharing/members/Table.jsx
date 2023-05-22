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
        headerTitle="说明：会员分润基数为实际毛利"
        actionRef={ref}
        options={false}
        defaultSize="small"
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
        cardProps={{
          headStyle: {},
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        cardBordered={true}
        columns={columns(edit)}
        rowKey="totalPercent"
      />
      <Edit tableRef={ref} />
    </>
  );
}
