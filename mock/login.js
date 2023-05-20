export default {
  'POST /api/users/login': (req, res) => {
    const { userName, passWord, phone, code } = req.body;
    if ((userName === 'admin' && passWord === '123456') || (code && phone)) {
      res.send({
        code: 200,
        message: '登录成功！',
        result: {
          access_token: '3096208b45df735aeebf072e90a4',
        },
      });
      return;
    }
    res.send({
      code: -1,
      message: '登录失败！',
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
};
