import { useState } from 'react';

export default function useModelProductParameters() {
  const [store, setStore] = useState({
    tab: 'tab1',
  });
  return {
    store,
    setStore,
  };
}
