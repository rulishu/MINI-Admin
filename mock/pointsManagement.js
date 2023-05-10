export default {
  'POST /api/selectPointsPage': (req, res) => {
    const { pageSize } = req.body;
    const list = [];
    for (let i = 0; i < pageSize; i++) {
      list[i] = {
        id: i + 1,
        type: '1',
        name: '微信用户5800',
        number: '粉丝',
        lastName: '用户',
        birthday: '1987-07-18',
        phone: '13858700719',
        allPrice: '657.0',
        balance: '51.0',
        label: '',
        time: '2022-10-24 13:35:52',
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
