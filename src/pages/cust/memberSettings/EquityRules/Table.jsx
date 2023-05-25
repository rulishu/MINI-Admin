import { del, selectPage } from '@/service/cust/equityRules';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch } from '@umijs/max';
import { App, Button } from 'antd';
import { useRef } from 'react';
import Edit from './Edit';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const { modal } = App.useApp;
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'fansManage/update',
      payload: data,
    });
  };
  const reload = ref?.current?.reload;

  const handle = async (type, data) => {
    update({ type: type });
    if (type === 'add') {
      update({ visible: true, queryData: {}, type: type });
    }
    if (type === 'edit') {
      update({ visible: true, queryData: { ...data }, type: type });
    }
    if (type === 'del') {
      modal.confirm({
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
              // success: true,
            };
          }
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => handle('add', {})}>
            新增会员权益
          </Button>,
        ]}
        search={false}
        pagination={{
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
