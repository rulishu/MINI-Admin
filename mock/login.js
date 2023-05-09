export default {
  'POST /api/users/login': (req, res) => {
    const { username, password, phone, code, type } = req.body;
    if ((username === 'admin' && password === 'admin') || (code && phone)) {
      res.send({
        code: 1,
        message: '登录成功！',
        data: {
          type,
        },
        token: '3096208b45df735aeebf072e90a4',
      });
      return;
    }
    res.send({
      code: -1,
      message: '登录失败！',
      data: {
        type,
      },
      token: null,
    });
  },
  'POST /api/demo/selectPage': (req, res) => {
    const { pageSize } = req.body;
    const list = [];
    for (let i = 0; i < pageSize; i++) {
      list[i] = {
        id: i,
        name: '霞仔',
        title: '16',
        address: '上海市',
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
  'POST /api/selectPage': (req, res) => {
    const { pageSize } = req.body;
    const list = [];
    for (let i = 0; i < pageSize; i++) {
      list[i] = {
        id: i + 1,
        type: '1',
        name: '微信用户580',
        number: '粉丝',
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
  'POST /api/selectEqutiyPage': (req, res) => {
    const { pageSize } = req.body;
    const list = [];
    for (let i = 0; i < pageSize; i++) {
      list[i] = {
        id: i + 1,
        type: '1',
        name: 'VIP奋斗者1折',
        number: '新品酒会员购买享受10折优惠',
        level: 'VIP2',
        it: '1.直接购买金额：99.0',
        num: '1.购买折扣：10.0 2.赠送权益规则',
        day: '永久有效',
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
