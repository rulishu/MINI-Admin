export default {
  'POST /api/productParameters/selectPage': (req, res) => {
    const { pageSize } = req.body;
    const list = [];
    for (let i = 0; i < pageSize; i++) {
      list[i] = {
        id: i + 1,
        type: '五粮液',
        day: '20天',
        moneny: '1200',
        number: '10',
        month: '12',
        custName: 'xx',
        phone: '13765789871',
        address: 'xxxx街道',
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
