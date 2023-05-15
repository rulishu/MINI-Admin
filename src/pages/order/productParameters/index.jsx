import { selectPage } from '@/service/productParameters';
import { ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Tabs } from 'antd';
import { columns } from './columns';
import styles from './index.less';

export default function Page() {
  const { tab } = useSelector((state) => state.afterSalesAudit);
  const dispatch = useDispatch();
  const update = (data) => {
    dispatch({
      type: 'afterSalesAudit/update',
      payload: data,
    });
  };

  const Table = (
    <ProTable
      className={styles.card_pro}
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
      pagination={{
        showSizeChanger: true,
      }}
      cardBordered={true}
      columns={columns({
        activeKey: tab,
      })}
      rowKey="id"
      scroll={{ x: 1300 }}
    />
  );

  const items = [
    {
      label: `待预告`,
      key: 'tab1',
      children: Table,
    },
    {
      label: `待启封`,
      key: 'tab2',
      children: Table,
    },
    {
      label: `待发货`,
      key: 'tab3',
      children: Table,
    },
    {
      label: `待收货`,
      key: 'tab4',
      children: Table,
    },
    {
      label: `已完成`,
      key: 'tab5',
      children: Table,
    },
  ];

  return <Tabs activeKey={tab} items={items} onChange={(key) => update({ tab: key })} />;
}
