import { useState } from 'react';

const getToken = () => sessionStorage.getItem('token');
export default function useModelGlobal() {
  const [store, setStore] = useState({
    token: getToken(),
  });
  const [signVisible, setSignVisible] = useState(false);

  const update = (payload) => {
    setStore({ ...store, ...payload });
  };

  return {
    store,
    setStore,
    update,
    signVisible,
    setSignVisible,
  };
}
