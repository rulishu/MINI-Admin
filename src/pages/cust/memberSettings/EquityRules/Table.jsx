import { selectPage } from '@/service/equityRules';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { useRef, useState } from 'react';
import Edit from './Edit';
import { columns } from './columns';

export default function SearchTable() {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  const {
    update,
    store: { queryData },
  } = useModel('equityRules', (model) => ({ ...model }));
  const reload = ref?.current?.reload;

  const handle = async (type, data) => {
    update({ type: type });
    if (type === 'add') {
      update({ visible: true, queryData: {} });
    }
    if (type === 'edit') {
      update({ visible: true, queryData: { ...data, ...queryData } });
    }
    if (type === 'delete') {
      // await mutation.mutateAsync({ id: 1 });
    }
    // Modal.confirm({
    //   title: '确定是否删除',
    //   onOk: () => {
    //     ref.current.reload();
    //   },
    // });
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
          if (code === 200) {
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
          pageSize: pageSize,
          onChange: (_, pageSize) => setPageSize(pageSize),
        }}
        cardBordered={true}
        columns={columns(handle)}
        rowKey="id"
      />
      <Edit reload={reload} />
    </>
  );
}
