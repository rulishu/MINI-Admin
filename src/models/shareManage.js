import { useState } from 'react';

export default function useModelShareManage() {
  const [store, setStore] = useState({
    tab: 'tab1',
  });
  return {
    store,
    setStore,
  };
}
