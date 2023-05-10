import { useState } from 'react';

export default function useModelGroupManage() {
  const [store, setStore] = useState({
    visible: false,
    queryInfo: {},
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
