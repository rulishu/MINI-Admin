import { useState } from 'react';

export default function useModelMemberManage() {
  const [store, setStore] = useState({
    addVisible: false,
  });
  return {
    store,
    setStore,
  };
}
