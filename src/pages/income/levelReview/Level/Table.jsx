import { selectPage } from '@/service/memberSettings';
import { ProTable } from '@ant-design/pro-components';
import { ButtonGroupPro } from '@antdp/antdp-ui';
import { useDispatch, useSelector } from '@umijs/max';
import { useRef } from 'react';
import { columns } from './columns';

const LevelReview = () => {
  const ref = useRef();
  const { activeKey } = useSelector((state) => state.levelReview);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'levelReview/update',
      payload: data,
    });
  };
  return (
    <div>
      <ProTable
        actionRef={ref}
        options={false}
        request={async (params = {}) => {
          const { current, pageSize, ...formData } = params;
          const { code, data } = await selectPage({
            pageNum: current,
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
          showSizeChanger: true,
        }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activeKey,
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
              update({ activeKey: key });
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
