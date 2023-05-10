export default {
  'POST /api/exchangeDetails/selectPage': (req, res) => {
    const { pageSize } = req.body;
    const list = [];
    for (let i = 0; i < pageSize; i++) {
      list[i] = {
        id: i + 1,
        type: '优惠券商品',
        day: '20天',
        number: '10',
        month: '12',
        name: '赵锋',
        num: '50.0',
        time: '2023-05-03 23:03:45',
        state: '兑换成功',
      };
    }
    setTimeout(() => {
      res.send({
        code: 1,
        message: '查询成功',
        data: {
          rows: list,
          total: 100,
        },
      });
    }, 2000);
  },
};
