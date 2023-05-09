import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
export default function Page() {
  const { store, setStore } = useModel('productParameters', (model) => ({
    ...model,
  }));
  return (
    <ProCard
      tabs={{
        activeKey: store.tab,
        items: [
          {
            label: `待预告`,
            key: 'tab1',
            children: `内容一`,
          },
          {
            label: `产品二`,
            key: 'tab2',
            children: `内容二`,
          },
          {
            label: `产品三`,
            key: 'tab3',
            children: `内容三`,
          },
        ],
        onChange: (key) => setStore({ ...store, tab: key }),
      }}
    />
  );
}
