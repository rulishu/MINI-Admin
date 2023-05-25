import { queryUserDsConfig } from '@/service/profitSharing/headquarters';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { useRef } from 'react';
import Edit from './Edit';
import { columns } from './columns';
import { configType } from './config';

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
        headerTitle={'说明：推荐基数为分润毛利'}
        request={async () => {
          const { code, result } = await queryUserDsConfig({
            configType,
          });
          if (code && code === 200) {
            return {
              data: (result && [result]) || [],
              success: true,
            };
          }
        }}
        search={false}
        cardProps={{
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
