import { useState } from 'react';

export default function useModelTagsManage() {
  const [store, setStore] = useState({
    visible: false,
    activeKey: 'tab1',
    queryInfo: {},
  });
  const [visible, setVisible] = useState(false);
  return {
    store,
    setStore,
    visible,
    setVisible,
  };
}
