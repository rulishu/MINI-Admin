import { selectPage } from '@/service/memberShipLevel';
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
  const reload = ref?.current?.reload;
  const { update } = useModel('memberShipLevel', (model) => ({ ...model }));

  const handle = (type) => {
    if (type === 'add') {
      update({ visible: true, queryData: {}, type: type });
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
                  label: '新建会员等级',
                  icon: <PlusOutlined />,
                  onClick: () => handle('add', {}),
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
        cardBordered={true}
        columns={columns()}
        rowKey="id"
      />
      <Edit reload={reload} />
    </>
  );
}
