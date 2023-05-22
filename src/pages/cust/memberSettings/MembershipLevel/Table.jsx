import { del, selectPage } from '@/service/cust/memberShipLevel';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import Edit from './Edit';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  const reload = ref?.current?.reload;
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'membershipLevel/update',
      payload: data,
    });
  };

  const handle = (type, data) => {
    if (type === 'add') {
      update({ visible: true, queryData: {}, type: type });
    }
    if (type === 'edit') {
      update({ visible: true, queryData: { ...data }, type: type });
    }
    if (type === 'del') {
      Modal.confirm({
        title: '确定是否删除',
        onOk: async () => {
          const { code } = await del(data?.id);
          if (code && code === 200) {
            ref?.current?.reload();
          }
        },
      });
    }
  };

  return (
    <>
      <ProTable
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, result } = await selectPage({
            pageSize,
            pageNum: current,
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
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => handle('add', {})}>
            新建会员等级
          </Button>,
        ]}
        search={false}
        pagination={{
          pageSize: pageSize,
          onChange: (_, pageSize) => setPageSize(pageSize),
          showSizeChanger: true,
        }}
        cardBordered={true}
        columns={columns(handle)}
        rowKey="id"
      />
      <Edit reload={reload} />
    </>
  );
}
