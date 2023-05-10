import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useModel } from '@umijs/max';
import { useRef, useState } from 'react';
import { columns } from './columns';

const LevelReview = () => {
  const ref = useRef();
  const [pageSize, setPageSize] = useState(10);
  const { store, setStore } = useModel('levelReview', (model) => ({
    ...model,
  }));
  console.log(111, store);
  return (
    <div>
      <ProTable
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, data } = await selectPage({
            current,
            pageSize,
            queryData: { ...formData },
          });
          if (code === 1) {
            return {
              data: data.rows || [],
              total: data.total,
              success: true,
            };
          }
        }}
        search={{
          defaultCollapsed: false,
        }}
        pagination={{
          pageSize: pageSize,
          onChange: (_, pageSize) => setPageSize(pageSize),
          showSizeChanger: true,
        }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: store.activeKey,
            items: [
              {
                key: 'tab1',
                label: '全部',
              },
              {
                key: 'tab2',
                label: '待审核',
              },
              {
                key: 'tab3',
                label: '已通过',
              },
              {
                key: 'tab4',
                label: '已拒绝',
              },
            ],
            onChange: (key) => {
              setStore({ ...store, activeKey: key });
              ref?.current?.reload();
            },
          },
          actions: (
            <ButtonGroupPro
              button={[
                {
                  type: 'primary',
                  label: '批量审核',
                },
              ]}
            />
          ),
        }}
        cardBordered={true}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};
export default LevelReview;