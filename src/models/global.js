import { useState } from 'react';

const getToken = () => sessionStorage.getItem('token');
export default function useModelGlobal() {
  console.log('getToken',getToken())
  const [store, setStore] = useState({
    token: getToken(),
  });
  return {
    store,
    setStore
  };
}