import { selectPage } from '@/service/boutique';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button } from 'antd';
import { Fragment, useRef, useState } from 'react';
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
          title: '精品列表',
          actions: (
            <Fragment>
              <Button type="primary">订单批量留言</Button>
              <Button type="primary">订单批量备注</Button>
              <Button type="primary">订单批量标签</Button>
              <Button type="primary">子订单批量标签</Button>
            </Fragment>
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
        cardProps={{
          // bodyStyle: { padding: 0 },
          size: 'small',
          style: {
            padding: 0,
          },
        }}
        cardBordered={true}
        columns={columns}
        rowKey="id"
      />
    </>
  );
}
