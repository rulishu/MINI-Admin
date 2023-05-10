import { useState } from 'react';

export default function useModelTagsManage() {
  const [store, setStore] = useState({
    visible: false,
    visibleTable: false,
  });
  return {
    store,
    setStore,
  };
}
