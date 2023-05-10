import { useState } from 'react';

export default function useModelProductManage() {
  const [store, setStore] = useState({
    tabs: '1',
    activeKey: '1',
    type: '',
  });

  const update = (value) => {
    setStore({ ...store, ...value });
  };

  return {
    store,
    update,
  };
}