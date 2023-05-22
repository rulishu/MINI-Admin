import { queryDealerDsConfig } from '@/service/profitSharing/distribution';
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
      type: 'distribution/update',
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
          const { code, result = [] } = await queryDealerDsConfig({
            configType,
          });
          if (code && code === 200) {
            return {
              data: result,
              success: true,
            };
          }
        }}
        search={false}
        cardBordered={true}
        columns={columns(edit)}
        rowKey="id"
      />
      <Edit tableRef={ref} />
    </>
  );
}
