import { added, deleteProduct, takeDown } from '@/service/productManage';
import { message } from 'antd';
import { useState } from 'react';

export default function useModelProductManage() {
  const [store, setStore] = useState({
    tabs: '1',
    activeKey: '1',
    type: '',
    select: {
      selectedRowKeys: [],
      selectedRows: [],
    },
  });

  const update = (value) => {
    setStore({ ...store, ...value });
  };

  const deletePro = async (select, callBack) => {
    if (select.selectedRowKeys.length !== 0) {
      const res = await deleteProduct(select.selectedRowKeys);
      if (res.code === 200) {
        callBack();
      }
    } else {
      message.warning('请勾选商品');
    }
  };

  const upload = async (selectedRowKeys, callBack) => {
    if (selectedRowKeys.length !== 0) {
      const res = await added(selectedRowKeys);
      if (res.code === 200) {
        callBack();
      }
    } else {
      message.warning('请勾选商品');
    }
  };

  const down = async (selectedRowKeys, callBack) => {
    if (selectedRowKeys.length !== 0) {
      const res = await takeDown({ ids: selectedRowKeys, soldOutReason: 'why' });
      if (res.code === 200) {
        callBack();
      }
    } else {
      message.warning('请勾选商品');
    }
  };

  return {
    store,
    update,
    deletePro,
    upload,
    down,
  };
}
