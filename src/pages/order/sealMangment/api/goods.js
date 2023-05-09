let goodsList = [
  {
    id: '1',
    name: '商品1',
    group: '分组1',
    order_number: '订单1',
    paid_amount: 100.0,
    sealed_number: 10,
    sealed_term: 6,
    created_time: new Date(),
    customer_name: '客户1',
    phone_number: '12345678901',
  },
  {
    id: '2',
    name: '商品2',
    group: '分组2',
    order_number: '订单2',
    paid_amount: 200.0,
    sealed_number: 20,
    sealed_term: 12,
    created_time: new Date(),
    customer_name: '客户2',
    phone_number: '23456789012',
  },
];

const listGoods = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...goodsList]); // 返回商品列表副本
    }, 500);
  });
};

const createGoods = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newGoods = { ...data, id: (goodsList.length + 1).toString(), created_time: new Date() };
      goodsList.push(newGoods); // 将新商品添加到列表末尾
      resolve(newGoods); // 返回新商品对象
    }, 500);
  });
};

const updateGoods = (id, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = goodsList.findIndex((item) => item.id === id);
      if (index >= 0) {
        goodsList[index] = { ...goodsList[index], ...data };
        resolve();
      } else {
        reject(new Error(`商品 ${id} 不存在`));
      }
    }, 500);
  });
};

const deleteGoods = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = goodsList.findIndex((item) => item.id === id);
      if (index >= 0) {
        goodsList.splice(index, 1); // 删除指定索引位置的商品
        resolve();
      } else {
        reject(new Error(`商品 ${id} 不存在`));
      }
    }, 500);
  });
};

export { listGoods, createGoods, updateGoods, deleteGoods };
