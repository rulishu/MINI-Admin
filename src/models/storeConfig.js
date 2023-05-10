import { useState } from 'react';

export default function useModelStoreConfig() {
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
