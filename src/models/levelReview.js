import { useState } from 'react';

export default function useModelLevelReview() {
  const [store, setStore] = useState({
    visible: false,
    activeKey: 'tab1',
    queryInfo: {},
    type: '',
  });
  const [visible, setVisible] = useState(false);
  return {
    store,
    setStore,
    visible,
    setVisible,
  };
}