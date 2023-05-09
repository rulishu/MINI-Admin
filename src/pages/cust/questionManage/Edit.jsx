import { useModel } from '@umijs/max';
import { Drawer } from 'antd';

export default function Edit() {
  const {
    store,
    store: { visible },
    setStore,
  } = useModel('tagsManage', (model) => ({ ...model }));
  const close = () => setStore({ ...store, visible: false });
  return (
    <Drawer open={visible} onClose={close} destroyOnClose size="large">
      <span>编辑/新增</span>
    </Drawer>
  );
}
