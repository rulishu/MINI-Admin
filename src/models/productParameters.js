import { useState } from 'react';

export default function useModelTagsManage() {
  const [store, setStore] = useState({
    tab: 'tab1',
  });
  return {
    store,
    setStore,
  };
}
