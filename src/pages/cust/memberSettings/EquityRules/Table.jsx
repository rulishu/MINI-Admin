import { del, selectPage } from '@/service/equityRules';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useDispatch } from '@umijs/max';
import { Modal } from 'antd';
import { useRef } from 'react';
import Edit from './Edit';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();

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
              // success: true,
            };
          }
        }}
        toolbar={{
          actions: (
            <ButtonGroupPro
              button={[
                {
                  type: 'primary',
                  label: '新增会员权益',
                  icon: <PlusOutlined />,
                  onClick: () => handle('add', {}),
                },
              ]}
            />
          ),
        }}
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
