import { useState } from 'react';

export default function useModelMemberShipLevel() {
  const [store, setStore] = useState({
    tabs: '1',
    activeKey: '1',
    type: '',
    visible: false,
    queryData: {},
  });

  const update = (value) => {
    setStore({ ...store, ...value });
  };

  return {
    store,
    update,
  };
}
