import { selectPage } from '@/service/tagsManage';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { columns } from './columns';
import styles from './index.less';

export default function Page() {
  const { store, setStore } = useModel('productParameters', (model) => ({
    ...model,
  }));

  const Table = (
    <ProTable
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
      pagination={{
        showSizeChanger: true,
      }}
      cardBordered={false}
      columns={columns()}
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
      children: `内容二`,
    },
    {
      label: `待发货`,
      key: 'tab3',
      children: `内容三`,
    },
    {
      label: `待收货`,
      key: 'tab4',
      children: `内容三`,
    },
    {
      label: `已完成`,
      key: 'tab5',
      children: `内容三`,
    },
  ];

  return (
    <ProCard
      className={styles.card_pro}
      tabs={{
        activeKey: store.tab,
        items: items,
        onChange: (key) => setStore({ ...store, tab: key }),
      }}
    />
  );
}
