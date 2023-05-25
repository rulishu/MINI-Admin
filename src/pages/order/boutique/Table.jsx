import { selectPage } from '@/service/boutique';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useDispatch, useSelector } from '@umijs/max';
import { useRef, useState } from 'react';
import Search from './Search';
import { columns } from './columns';

export default function Tables() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  const { select } = useSelector((state) => state.boutique);
  const dispatch = useDispatch();

  return (
    <>
      <ProCard bordered style={{ marginBottom: 20 }}>
        <Search />
      </ProCard>
      <ProTable
        headerTitle="精品订单"
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, result } = await selectPage({
            pageNum: current,
            pageSize,
            ...formData,
          });
          if (code && code === 200) {
            return {
              data: result.records || [],
              total: result.total,
              success: true,
            };
          }
        }}
        toolbar={{
          actions: (
            <ButtonGroupPro
              button={[
                {
                  type: 'primary',
                  label: '订单批量留言',
                },
                {
                  type: 'primary',
                  label: '订单批量备注',
                },
                {
                  type: 'primary',
                  label: '订单批量标签',
                },
                {
                  type: 'primary',
                  label: '子订单批量标签',
                },
              ]}
            />
          ),
        }}
        search={false}
        pagination={{
          pageSize: pageSize,
          onChange: (_, pageSize) => setPageSize(pageSize),
          showSizeChanger: true,
        }}
        rowSelection={{
          selectedRowKeys: select.selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            dispatch({
              type: 'boutique/update',
              payload: {
                select: { selectedRowKeys: selectedRowKeys, selectedRows: selectedRows },
              },
            });
          },
        }}
        cardBordered={true}
        columns={columns}
        rowKey="id"
      />
    </>
  );
}
