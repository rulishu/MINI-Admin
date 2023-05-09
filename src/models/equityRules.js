import { useState } from 'react';

export default function useModelTagsManage() {
  const [store, setStore] = useState({
    visible: false,
  });
  return {
    store,
    setStore,
  };
}
