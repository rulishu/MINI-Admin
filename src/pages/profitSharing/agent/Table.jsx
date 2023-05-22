import { queryUserDsConfig } from '@/service/profitSharing/agent';
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
      type: 'agent/update',
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
          const { code, result } = await queryUserDsConfig({});
          if (code && code === 200) {
            return {
              data: result || [],
              success: true,
            };
          }
        }}
        search={false}
        cardBordered={true}
        columns={columns(edit)}
        rowKey={(record) => record.level + record.putPercent + record.sendPercent}
      />
      <Edit tableRef={ref} />
    </>
  );
}
