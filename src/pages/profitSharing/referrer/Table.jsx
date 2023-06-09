import { queryOne } from '@/service/profitSharing/referrer';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { useRef } from 'react';
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
    <ProTable
      headerTitle="说明：推荐基数为实际毛利"
      actionRef={ref}
      options={false}
      defaultSize="small"
      pagination={false}
      request={async () => {
        const { code, result } = await queryOne({
          configType: 7,
        });
        if (code && code === 200) {
          const source = [];
          source.push(result);
          return {
            data: [...source],
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
      columns={columns(edit, ref)}
      rowKey="id"
    />
  );
}
