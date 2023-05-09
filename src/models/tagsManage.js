import { useState } from 'react';

export default function useModelTagsManage() {
  const [store, setStore] = useState({
    visible: false,
    activeKey: 'tab2',
  });
  return {
    store,
    setStore,
  };
}
